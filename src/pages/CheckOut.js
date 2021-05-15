import { useFormik, yupToFormErrors } from 'formik'
import React, { useContext, useState } from 'react'
import { Button, Header } from 'semantic-ui-react'
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
  const [payOnline, setPayOnline] = useState(true)
  const [orderDetails, setOrderDetails] = useState()
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
      console.log('gg')
      const { items = [] } = cart
      const productsIDs = items.map(product => `id_in=${product.id}`)
      const query = productsIDs.join('&')
      let total = 0
      const products = await getAllProducts(query)
      products.forEach(product => {
        const item = items.find(item => item.id === product.id)
        total += product.price * item.quantity
      })
      setOrderDetails({ ...values, total: `${total}` })
      setActiveStep(1)

    }
  })

  const { getFieldProps, errors, touched } = formik
  return (
    <div style={{margin: '20px 0px' }}>
      <CompletionSteps activeStep={activeStep} />
      <CartDetail/>
      {
        activeStep === 0 ?
          <>
            <OrderInformationForm getFieldProps={getFieldProps} errors={errors} touched={touched} />
            <Button floated='right' disabled={cart.total <= 0 || cart.items.length === 0}
              color='vk' content='Continue To Payment' onClick={formik.handleSubmit}
            />
          </>
          :
          activeStep === 1 ?
            <>
              <PayButton payOnline={payOnline} setPayOnline={setPayOnline} setActiveStep={setActiveStep} />
              <Button floated='right' disabled={cart.total <= 0 || cart.items.length === 0}
                color='vk' content='Review Order Summary' onClick={() => {
                  setActiveStep(2)
                }}
              />
            </>
            :
            <>
              <Header content='Order Confirmation' />
              <Button floated='right' disabled={cart.total <= 0 || cart.items.length === 0}
                color='vk' content='Place Order' onClick={async () => {
                const order = await addOrder(orderDetails)
                history.push(`/orders/${order.code}`)
              }} />
            </>
      }

    </div>
  )
}
