
import { useState, useContext } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Button, Container, Dropdown, Icon, Label, Menu, Search } from 'semantic-ui-react'

import { capitalize, searchProducts } from '../api/helpers'
import { CartContext } from '../contexts/CartContext'

const Header = ({ setQuery }) => {
  const brands = ['adel', 'prima', 'panda']
  const categories = ['school products', 'office tools']
  const [search, setSearch] = useState('')
  const [rawResults, setRawResults] = useState()
  const [results, setResults] = useState()
  const history = useHistory()
  const handelSearchInputChange = (e, data) => {
    setSearch(data.value)

    data.value && searchProducts(data.value)
      .then(result => {
        setRawResults(result)
        const formattedResult = result.map(product => ({
          "title": product.title,
          "description": product.category,
          "image": product.imageURL,
          "price": product.price.toString()
        }))

        setResults(formattedResult)
      })
  }

  const openProductPage = (e, data) => {
    const { id } = rawResults.find(result => result.title === data.result.title)
    history.push(`/product/${id}`)
  }
  const { cart } = useContext(CartContext)
  return (
    
    <Menu stackable style={{ boxShadow: '0 2px 5px 0 rgba(0,0,0,.08)' }} compact borderless size='large' attached='top'>
      <Container>

      <Menu.Item style={{justifyContent: 'center'}} as={Link} to='/' onClick={() => setQuery('')} name='Home' />
      <Menu.Item style={{justifyContent: 'center'}} as={Link} to='/products' name='Promotions' />
      <Dropdown style={{justifyContent: 'center'}} item text='Brands' simple >
        <Dropdown.Menu >
          {brands.map((brand, index) => (
            <Dropdown.Item as={Link} to='/products' key={index} value={brand} onClick={(e, { value }) => setQuery(`brand=${value}`)}>{capitalize(brand)}</Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>

      <Dropdown style={{justifyContent: 'center'}} item simple text='Categories'>
        <Dropdown.Menu>
          {categories.map((category, index) => (
            <Dropdown.Item as={Link} to='/products' key={index} text={capitalize(category)} value={category} onClick={(e, { value }) => setQuery(`category=${value}`)} />
          ))}
        </Dropdown.Menu>
      </Dropdown>


      <Menu.Item position='right' style={{ justifyContent: 'center'}}>
        <Search
          fluid
          size='small'
          onSearchChange={handelSearchInputChange}
          value={search}
          results={results}
          onResultSelect={openProductPage}
        />

        <Button circular as={Link} compact basic to='/cart'>
          <Icon fitted name='shopping cart' />
          {cart.count !== 0 && <Label floating circular color='red' content={cart.count} />}
        </Button>
      </Menu.Item>
      </Container>
    </Menu>
  )

}




export default Header