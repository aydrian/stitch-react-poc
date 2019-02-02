import { Component } from 'react'
import { withStitch } from './StitchContext'

import { AnonymousCredential } from 'mongodb-stitch-browser-sdk'

class AnonymousLogin extends Component {
  constructor(props) {
    super(props)
    this.client = this.props.client
    this.state = {
      user: {}
    }
  }

  componentDidMount = async () => {
    const user = await this.client.auth.loginWithCredential(
      new AnonymousCredential()
    )
    this.setState(user)
  }

  render() {
    const { children } = this.props
    return children ? children(this.state.user) : null
  }
}

export default withStitch(AnonymousLogin)
