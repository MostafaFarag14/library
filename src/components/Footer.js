import React from 'react'
import { Container, Grid, GridColumn, Header, HeaderContent, Icon, Image, Input, List } from 'semantic-ui-react'

export default function Footer() {
  return (
    <div style={{ backgroundColor: 'black', marginTop: 50 }}>
      <Grid container padded='vertically'>
        <GridColumn computer={4} tablet={8} mobile={16}>
          <Image size='medium' src='https://samirandaly.com/store/web/media/image/samirandaly/store/b9f85fc2381f58933742205dd323aa12.png' />
        </GridColumn>
        <GridColumn computer={4} tablet={8} mobile={16} style={{ color: 'white' }}>
          <Header style={{ color: 'white' }} content='Quick Links' />
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li>Home</li>
            <li>Contact Us</li>
            <li>Brands</li>
            <li>Branches</li>
          </ul>
        </GridColumn>
        <GridColumn computer={4} tablet={8} mobile={16} style={{ color: 'white' }}>
          <Header style={{ color: 'white' }} content='Contact Us' />
          <Icon inverted name='time' />
          <span>Working Days</span>
          <Header size='tiny' style={{ color: 'white' }} content='Saturday - Thursday : 10:00 AM - 10:00 PM' />
        </GridColumn>
        <GridColumn computer={4} tablet={8} mobile={16} style={{ color: 'white' }}>
          <Header style={{ color: 'white' }} content='Newsletter' />
          <Input placeholder='Email' icon='mail' />
          <Header style={{ color: 'white' }} content='Follow Us' />
          <List>
            <List.Item>
              <a href='https://www.youtube.com/channel/UCSBE7lwuPmbkyX43NI13laQ'>
                <Icon link size='big' inverted name='youtube' />
              </a>
              <a href='https://www.youtube.com/channel/UCSBE7lwuPmbkyX43NI13laQ'>
                <Icon link size='big' inverted name='facebook f' />
              </a>
              <a href='https://www.youtube.com/channel/UCSBE7lwuPmbkyX43NI13laQ'>
                <Icon link size='big' inverted name='twitter' />
              </a>
              <a href='https://www.youtube.com/channel/UCSBE7lwuPmbkyX43NI13laQ'>
                <Icon link size='big' inverted name='instagram' />
              </a>
            </List.Item>
          </List>
        </GridColumn>
      </Grid>
    </div>
  )
}
