import React, { Component } from 'react'
import Query from './provider/Query'
import AnonymousLogin from './provider/AnonymousLogin'

import { Container, Card, Image, Dropdown } from 'semantic-ui-react'

const categories = [
  {
    text: 'Apparel',
    value: 'apparel'
  },
  {
    text: 'Bags',
    value: 'bags'
  },
  {
    text: 'Kids',
    value: 'kids'
  },
  {
    text: 'Travel',
    value: 'travel'
  },
  {
    text: 'Accessories',
    value: 'accessories'
  },
  {
    text: 'Vintage',
    value: 'vintage'
  }
]

class App extends Component {
  state = {
    category: 'apparel'
  }

  handleChange = (e, { name, value }) => this.setState({ [name]: value })

  render() {
    return (
      <Container>
        <AnonymousLogin />
        <Dropdown
          name="category"
          placeholder="Select Category"
          selection
          options={categories}
          defaultValue={this.state.category}
          onChange={this.handleChange}
        />
        <Query
          database="swagstore"
          collection="products"
          query={{ category: this.state.category }}
        >
          {({ data, error }) => {
            console.log('Query Data:', data)
            console.log('Query Error:', error)
            return (
              <Card.Group>
                {data.map(datum => {
                  return (
                    <Card key={datum.id}>
                      <Image src={datum.image.large} />
                      <Card.Content>
                        <Card.Header>{datum.name}</Card.Header>
                        <Card.Description>{datum.overview}</Card.Description>
                      </Card.Content>
                    </Card>
                  )
                })}
              </Card.Group>
            )
          }}
        </Query>
      </Container>
    )
  }
}

export default App
