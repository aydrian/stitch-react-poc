import { Component } from 'react'
import { withStitch } from './StitchContext'

import { AnonymousCredential } from 'mongodb-stitch-browser-sdk'

class AnonymousLogin extends Component {
  constructor(props) {
    super(props)
    this.client = this.props.client
    this.autoLogin = this.props.autoLogin
    this.state = {
      isLoggedIn: this.client.auth.isLoggedIn,
      user: {},
      onLogin: this.handleLogin,
      onLogout: this.handleLogout
    }
  }

  componentDidMount = async () => {
    if (this.autoLogin && !this.client.auth.isLoggedIn) {
      const user = await this.client.auth.loginWithCredential(
        new AnonymousCredential()
      )
      this.setState({ user, isLoggedIn: true })
    }
  }

  handleLogin = async () => {
    if (this.client.auth.isLoggedIn) {
      return
    }
    const user = await this.client.auth.loginWithCredential(
      new AnonymousCredential()
    )
    this.setState({ user, isLoggedIn: true })
  }

  handleLogout = () => {
    if (this.client.auth.isLoggedIn) {
      this.client.auth.logout()
      this.setState({ isLoggedIn: false, user: {} })
    }
  }

  render() {
    const { children } = this.props
    return children ? children(this.state) : null
  }
}

export default withStitch(AnonymousLogin)
