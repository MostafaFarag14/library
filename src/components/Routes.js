import { Route, Switch } from 'react-router-dom';
import { Container, Grid } from 'semantic-ui-react';

import Filter from './Filter'
import Main from './Main'
import Item from './Item'
import SortMenu from './SortMenu'

import Cart from '../pages/Cart';
import CheckOut from '../pages/CheckOut';
import Order from '../pages/Order';
import LoadingSegment from './LoadingSegment';
import Home from '../pages/Home';


export default function Routes({ query, setQuery, loading }) {
  return (
    <Container>
      <Switch>
        <Route exact path='/products' render={() => (
          <Grid padded='vertically'>
            <Grid.Column computer={4} mobile={16}>
              <Filter query={query} setQuery={setQuery} />
            </Grid.Column>
            {/* <div style={{ margin: 10, flex: 1, textAlign: 'right' }}> */}
            <Grid.Column textAlign='right' computer={12} mobile={16}>
              <SortMenu query={query} setQuery={setQuery} />
              {loading === true ? <LoadingSegment /> : <Main query={query} />}
            </Grid.Column>
            {/* </div> */}
          </Grid>
        )
        } />
        <Route path='/product/:id' component={Item} />
        <Route path='/cart' component={Cart} />
        <Route path='/checkout' component={CheckOut} />
        <Route path='/orders/:code' component={Order} />
        <Route exact path='/' component={Home} />
      </Switch>
    </Container>
  )
}
