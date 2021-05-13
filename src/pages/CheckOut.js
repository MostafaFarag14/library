import { useFormik, yupToFormErrors } from 'formik'
import React, { useContext, useState } from 'react'
import { Button } from 'semantic-ui-react'
import CartDetail from '../components/CartDetail'
import OrderInformationForm from '../components/OrderInformationForm'
import * as Yup from 'yup'
import { CartContext } from '../contexts/CartContext'
import { addOrder, getAllProducts } from '../api/helpers'
import { useHistory } from 'react-router-dom'
import CompletionSteps from '../components/CompletionSteps'
import PayButton from '../components/PayButton'
export default function CheckOut() {
  const [activeStep, setActiveStep] = useState(0)
  const { cart } = useContext(CartContext)
  const history = useHistory()
  const formik = useFormik({
    initialValues: {
      firstname: '',
      lastname: '',
      email: '',
      phonenumber: '',
      address: ''
    },
    validationSchema: Yup.object().shape({
      firstname: Yup.string().required(),
      lastname: Yup.string().required(),
      email: Yup.string().email().required()
    }),
    onSubmit: async values => {
      const { items = [] } = cart
      const productsIDs = items.map(product => `id_in=${product.id}`)
      const query = productsIDs.join('&')
      let total = 0
      const products = await getAllProducts(query)
      products.forEach(product => {
        const item = items.find(item => item.id === product.id)
        total += product.price * item.quantity
      })
      const order = await addOrder({
        ...values,
        total: `${total}`
      })
      history.push(`/orders/${order.code}`)
    }
  })

  const { getFieldProps, errors, touched } = formik
  return (
    <div style={{ flex: 1, marginTop: 20 }}>
      <CompletionSteps activeStep={activeStep} />
      <CartDetail />
      {
        activeStep === 0 ?
          <OrderInformationForm getFieldProps={getFieldProps} errors={errors} touched={touched} />
          :
          activeStep === 1 ? <PayButton setActiveStep={setActiveStep} />
            :
            <div>
              Order Confirmation
<Button onClick={formik.handleSubmit}></Button>
            </div>
      }
      <Button floated='right' disabled={cart.total <= 0 || cart.items.length === 0}
        color='vk' content='Continue To Payment' onClick={() => setActiveStep(1)} />
    </div>
  )
}
