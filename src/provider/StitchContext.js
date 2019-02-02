import React, { Component } from 'react'
import { string } from 'prop-types'

import { Stitch } from 'mongodb-stitch-browser-sdk'

const { Provider, Consumer } = React.createContext()

class StitchProvider extends Component {
  static propTypes = {
    appId: string.isRequired
  }

  constructor(props) {
    super(props)
    this.appId = props.appId
    const client = Stitch.initializeDefaultAppClient(this.appId)

    this.state = { client }
  }

  render() {
    return <Provider value={this.state.client}>{this.props.children}</Provider>
  }
}

function withStitch(Component) {
  return props => {
    return (
      <Consumer>{client => <Component {...props} client={client} />}</Consumer>
    )
  }
}

export { StitchProvider, Consumer as StitchConsumer, withStitch }
