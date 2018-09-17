import React, { Component } from 'react'
import { string, object } from 'prop-types'
import { StitchConsumer } from './StitchProvider'

import { Stitch, RemoteMongoClient } from 'mongodb-stitch-browser-sdk'

class Query extends Component {
  static propTypes = {
    database: string.isRequired,
    collection: string.isRequired,
    query: object.isRequired,
    projection: object
  }

  constructor(props) {
    super(props)

    this.client = props.client
    this.db = this.client
      .getServiceClient(RemoteMongoClient.factory, 'mongodb-atlas')
      .db(props.database)
    this.collection = this.db.collection(props.collection)
    this.state = { queryResult: [] }
  }

  componentDidMount() {
    this.getQueryResult()
  }

  getQueryResult() {
    const { query, projection = null } = this.props
    return this.collection
      .find(query, projection)
      .asArray()
      .then(data => {
        this.setState({ queryResult: data })
      })
  }

  render() {
    const { children } = this.props
    const { queryResult } = this.state
    return children(queryResult)
  }
}

export default props => (
  <StitchConsumer>
    {client => <Query {...props} client={client} />}
  </StitchConsumer>
)
