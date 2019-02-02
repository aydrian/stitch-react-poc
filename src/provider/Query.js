import { Component } from 'react'
import { string, object } from 'prop-types'
import { withStitch } from './StitchContext'

import { RemoteMongoClient } from 'mongodb-stitch-browser-sdk'

class Query extends Component {
  static propTypes = {
    client: object.isRequired,
    database: string.isRequired,
    collection: string.isRequired,
    query: object.isRequired,
    projection: object
  }

  constructor(props) {
    super(props)

    this.client = props.client

    this.state = { data: [], error: null }
  }

  componentDidMount = async () => {
    try {
      const data = await this.getQueryResult()
      this.setState({ data })
    } catch (error) {
      this.setState({ error })
    }
  }

  componentDidUpdate = async prevProps => {
    if (
      this.props.database !== prevProps.database ||
      this.props.collection !== prevProps.collection ||
      this.props.query !== prevProps.query ||
      this.props.projection !== prevProps.projection
    ) {
      try {
        const data = await this.getQueryResult()
        this.setState({ data })
      } catch (error) {
        this.setState({ error })
      }
    }
  }

  getQueryResult = () => {
    const { database, collection, query, projection = null } = this.props
    const mongodb = this.client.getServiceClient(
      RemoteMongoClient.factory,
      'mongodb-atlas'
    )
    return mongodb
      .db(database)
      .collection(collection)
      .find(query, { projection })
      .toArray()
  }

  render() {
    const { children } = this.props
    return children(this.state)
  }
}

export default withStitch(Query)
