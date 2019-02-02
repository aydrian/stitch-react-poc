import React from 'react'
import ReactDOM from 'react-dom'
import 'semantic-ui-css/semantic.min.css'
import { StitchProvider } from './provider/StitchContext'
import App from './App'
import registerServiceWorker from './registerServiceWorker'

ReactDOM.render(
  <StitchProvider appId="ecommercechatbot-glwkl">
    <App />
  </StitchProvider>,
  document.getElementById('root')
)
registerServiceWorker()
