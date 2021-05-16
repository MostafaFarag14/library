import React, { useContext, useState } from 'react'
import { Button, Header } from 'semantic-ui-react'
import CartDetail from '../components/CartDetail'
import OrderInformationForm from '../components/OrderInformationForm'
import { CartContext } from '../contexts/CartContext'
import { addOrder } from '../api/helpers'
import { useHistory } from 'react-router-dom'
import CompletionSteps from '../components/CompletionSteps'
import PayButton from '../components/PayButton'


export default function CheckOut() {
  const [activeStep, setActiveStep] = useState(0)
  const { cart } = useContext(CartContext)
  const [payOnline, setPayOnline] = useState(true)
  const [orderDetails, setOrderDetails] = useState()
  const history = useHistory()

  return (
    <div style={{ margin: '20px 0px' }}>
      <CompletionSteps activeStep={activeStep} />
      <CartDetail />
      {
        activeStep === 0 ?
          <OrderInformationForm setActiveStep={setActiveStep} setOrderDetails={setOrderDetails}/>
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
