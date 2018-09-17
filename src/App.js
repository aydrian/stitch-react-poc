import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import { StitchProvider } from './provider/StitchProvider'
import Query from './provider/Query'

class App extends Component {
  render() {
    return (
      <StitchProvider appId="ecommercechatbot-glwkl">
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Welcome to React</h1>
          </header>
          <p className="App-intro">
            To get started, edit <code>src/App.js</code> and save to reload.
          </p>
          <Query
            database="swagstore"
            collection="products"
            query={{ category: 'apparel' }}
          >
            {data => {
              console.log(data)
              return (
                <div>
                  {data.map(datum => {
                    return <div key={datum.id}>{datum.name}</div>
                  })}
                </div>
              )
            }}
          </Query>
        </div>
      </StitchProvider>
    )
  }
}

export default App
