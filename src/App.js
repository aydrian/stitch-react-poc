import React, { Component } from 'react'
import Query from './provider/Query'
import AnonymousLogin from './provider/AnonymousLogin'

import {
  Container,
  Message,
  Card,
  Image,
  Menu,
  Dropdown
} from 'semantic-ui-react'

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
      <AnonymousLogin autoLogin>
        {({ user, onLogout, isLoggedIn }) => (
          <Container>
            <Menu borderless size="small" stackable>
              <Menu.Item header>User ID: {user.id}</Menu.Item>
              <Menu.Item>
                <Dropdown
                  name="category"
                  icon="filter"
                  className="icon"
                  placeholder="Select Category"
                  selection
                  labeled
                  button
                  options={categories}
                  defaultValue={this.state.category}
                  onChange={this.handleChange}
                />
              </Menu.Item>
              <Menu.Item position="right" content="Logout" onClick={onLogout} />
            </Menu>
            {isLoggedIn && (
              <Query
                database="swagstore"
                collection="products"
                query={{ category: this.state.category }}
              >
                {({ data, error }) => {
                  console.log(`Query Data for ${this.state.category}:`, data)
                  return (
                    <Container>
                      <Message negative hidden={!error}>
                        <Message.Header>Error</Message.Header>
                        {error && error.message}
                      </Message>
                      <Card.Group>
                        {data.map(datum => {
                          return (
                            <Card key={datum.id}>
                              <Image src={datum.image.large} />
                              <Card.Content>
                                <Card.Header>{datum.name}</Card.Header>
                                <Card.Description>
                                  {datum.overview}
                                </Card.Description>
                              </Card.Content>
                            </Card>
                          )
                        })}
                      </Card.Group>
                    </Container>
                  )
                }}
              </Query>
            )}
          </Container>
        )}
      </AnonymousLogin>
    )
  }
}

export default App
