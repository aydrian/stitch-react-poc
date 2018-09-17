import React, { Component } from 'react'
import { string } from 'prop-types'

import { Stitch, AnonymousCredential } from 'mongodb-stitch-browser-sdk'

const StitchContext = React.createContext()

export class StitchProvider extends Component {
  static propTypes = {
    appId: string.isRequired
  }

  constructor(props) {
    super(props)
    this.appId = props.appId
    this.client = Stitch.initializeDefaultAppClient(this.appId)
    this.client.auth.loginWithCredential(new AnonymousCredential())
  }

  render() {
    const { children } = this.props
    return (
      <StitchContext.Provider value={this.client}>
        {children}
      </StitchContext.Provider>
    )
  }
}

export const StitchConsumer = StitchContext.Consumer
