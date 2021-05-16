import { ErrorMessage, Field, Form, Formik } from 'formik'
import * as Yup from 'yup'
import React, { useContext } from 'react'
import { Button, Grid, Input } from 'semantic-ui-react'
import { removeSpaces } from '../api/helpers'
import styled from 'styled-components'
import { CartContext } from '../contexts/CartContext'
import { getAllProducts } from '../api/helpers'

const StyledErrorMessage = styled.div`
display: inline-block;
color: red;
`
const StyledLabel = styled.label`
display: inline-block;
margin: 5px;
`

const initialValues = {
  firstname: '',
  lastname: '',
  email: '',
  phonenumber: '',
  address: ''
}
const validationSchema = Yup.object().shape({
  firstname: Yup.string().required('Required'),
  lastname: Yup.string().required('Required'),
  email: Yup.string().email('Invalid Email Format').required('Required'),
  phonenumber: Yup.string().length(11, 'Invalid Phone Number').matches(/[0-9]/, 'Invalid Phone Number').required('Required'),
  address: Yup.string().required('Required')
})


export default function OrderInformationForm({ setOrderDetails, setActiveStep }) {
  const { cart } = useContext(CartContext)
  const onSubmit = async values => {
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

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ errors, touched }) => (
        <Form>
          <Grid padded>
            {['First Name', 'Last Name', 'Email', 'Phone Number'].map((item, index) => {
              const name = removeSpaces(item).toLowerCase()
              return (<Grid.Column key={index} computer={8} mobile={16}>
                <StyledLabel>{item}</StyledLabel>
                <ErrorMessage name={name} component={StyledErrorMessage} />
                <Field as={Input} type='text' fluid name={name} placeholder={item} error={errors[name] && touched[name]} />
              </Grid.Column>)
            }
            )}
            <Grid.Column width={16}>
              <StyledLabel>Address</StyledLabel>
              <ErrorMessage name='address' component={StyledErrorMessage} />
              <Field as={Input} type='text' fluid placeholder='Address' name='address' error={errors.address && touched.address} />
            </Grid.Column>
          </Grid>
          <Button type='submit' floated='right' disabled={cart.total <= 0 || cart.items.length === 0}
            color='vk' content='Continue To Payment'
          />
        </Form>
      )}
    </Formik>
  )
}
