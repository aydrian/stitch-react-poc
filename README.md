# Stitch React Provider Components (POC)

Uses React Context to setup and pass around Stitch Client functionality

## Stitch Provider

Initialize a Stitch Client by wrapping the `App` with a Provider component.

```javascript
// index.js
import { StitchProvider } from './provider/StitchContext'
import App from './App'

ReactDOM.render(
  <StitchProvider appId="<STITCH-API-ID></STITCH-API-ID>">
    <App />
  </StitchProvider>,
  document.getElementById('root')
)
```

## Stitch Consumer

Access Stitch client

```javascript
import { StitchConsumer } from './provider/StitchContext'

const Welcome = props => (
  <StitchConsumer>
    {client => <h2>Welcome, {client.auth.user.profile.firstName}</h2>}
  </StitchConsumer>
)

export default Welcome
```

## Higher Order Component (HOC)

Inject Stitch client into a component as a prop

```javascript
import { withStitch } from './provider/StitchContext'

const Welcome = ({ client }) => (
  <h2>Welcome, {client.auth.user.profile.firstName}</h2>
)

export default withStitch(Welcome)
```

## Stitch Consumer Components

### Anonymous Login

A component that consumers the Stitch context and facilitates Anonymous authentication

```javascript
const App = () => {
  // Automatically Log in Anonymously and display nothing
  <AnonymousLogin auto />

  // Display logged in user information
  <AnonymousLogin auto>
  {({user}) => (
    <h2>User ID: {user.id}</h2>
  )}
  </AnonymousLogin>

  // Create Login Button
  <AnonymousLogin>
  {({onLogin}) => (
    <button onClick={() => onLogin}>Login Anonymously</button>
  )}
  </AnonymousLogin>
}
```

### Query

A component that executes a find

```javascript
const App = () => {
  <Query
    database="swagstore"
    collection="products"
    query={{ category: this.state.category }}
  >
    {({ data }) => {
      return (
        <ul>
          {data.map(datum => {
            <li>{datum.name}</li>
          })}
        </ul>
      )
    }}
}
```
