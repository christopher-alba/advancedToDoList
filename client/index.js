import React from 'react'
import ReactDOM from 'react-dom'

import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import jwtDecode from 'jwt-decode'
import reducers from './store/reducers'
import { HashRouter as Router } from 'react-router-dom'
import App from './components/App'
import { setAuthorizationToken, setAuth } from './store/actions/auth'
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client'

// REDUX
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const envr =
  process.env.NODE_ENV === 'production'
    ? applyMiddleware(thunk)
    : composeEnhancers(applyMiddleware(thunk))
const store = createStore(reducers, envr)

// AUTH
if (localStorage.jwtToken) {
  setAuthorizationToken(localStorage.jwtToken)
  try {
    store.dispatch(setAuth(jwtDecode(localStorage.jwtToken)))
  } catch (err) {
    store.dispatch(setAuth({}))
  }
}

// APOLLO && GRAPHQL
const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache()
})

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Router>
      <ApolloProvider client={client}>
        <Provider store={store}>
          <App />
        </Provider>
      </ApolloProvider>
    </Router>,
    document.getElementById('app')
  )
})
