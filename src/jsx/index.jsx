import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import ReduxPromise from 'redux-promise'

import Routes from './routes.jsx'
import reducers from '../reducers'

import '../vendor/bootstrap.min.css'
//import '../vendor/bootstrap-theme.min.css'
import '../fonts/magnesium/font.scss'
import '../scss/main.scss'

const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore)

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    {Routes}
  </Provider>, document.getElementById('app'))

/*
var obj1 = {
  uName: 'magster',
  location: 'New York'
}
var obj2 = {
  age:25,
  ...obj1
}
var uName = obj1;
console.log(obj2);
*/
