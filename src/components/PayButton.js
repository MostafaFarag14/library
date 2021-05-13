import { findByLabelText } from '@testing-library/dom';
import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import { Container, Radio, Segment } from 'semantic-ui-react';
const PayPalButton = window.paypal.Buttons.driver("react", { React, ReactDOM });

export default function PayButton({ total = 10, setActiveStep }) {
  const [payOnline, setPayOnline] = useState(true)
  const onCreateOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: total,
          },
        },
      ],
    });
  }
  const onApproveOrder = (data, actions) => {
    console.log(data)
    // return actions.order.capture();
  }
  return (
    <>
      <Radio toggle label={payOnline ? 'Pay Online' : 'Cash On Delivery'} checked={payOnline} onChange={(e, { checked }) => setPayOnline(checked)} />
      <div style={{ textAlign: 'center' }}>
        {payOnline && <PayPalButton total={10}
          createOrder={onCreateOrder} onApprove={onApproveOrder} />}
      </div>
    </>
  )
}
