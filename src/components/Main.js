import React, { useContext, useEffect, useState } from 'react'
import { Grid, Dimmer, Loader } from 'semantic-ui-react'
import { getAllProducts } from '../api/helpers'
import ProductCard from './ProductCard'


export default function Main({ query }) {
  const [products, setProducts] = useState([])

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getAllProducts(query.toString())
      setProducts(data)
    }
    fetchProducts()
  }, [query])



  return (

    <Grid  columns='3' doubling stackable>
      <Grid.Row>
        {products.map(product => (
          <Grid.Column key={product.id} style={{ marginTop: 20, padding: 8 }}>
            <ProductCard product={product} />
          </Grid.Column>
        ))}
      </Grid.Row>
    </Grid >

  )
}
