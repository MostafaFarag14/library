import { Dimmer, Image, Loader, Segment } from 'semantic-ui-react';

export default function LoadingSegment() {
  return (
    <Segment style={{ height: '50vh' }}>
      <Dimmer active inverted>
        <Loader size='big' >Loading</Loader>
      </Dimmer>
      <Image src='https://react.semantic-ui.com/images/wireframe/paragraph.png' />
      <Image src='https://react.semantic-ui.com/images/wireframe/paragraph.png' />
    </Segment>
  )
}
