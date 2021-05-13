import React from 'react'
import { Icon, Step } from 'semantic-ui-react'

const steps = {
  0: { name: 'Shipping', icon: 'truck' },
  1: { name: 'Payment', icon: 'credit card' },
  2: { name: 'Confirm Order', icon: 'info' }
}

export default function CompletionSteps({ activeStep }) {
  return (
    <Step.Group fluid>
      {
        Object.keys(steps).map(key => (
          <Step key={key} active={parseInt(key) === activeStep} completed={activeStep > key} disabled={activeStep < key}>
            <Icon name={steps[key].icon} />
            <Step.Content>
              <Step.Title>{steps[key].name}</Step.Title>
            </Step.Content>
          </Step>
        ))
      }
    </Step.Group>
  )
}
