import React from 'react'
import ReactDOM from 'react-dom'

import Routes from './routes.jsx'

import '../vendor/bootstrap.min.css'
import '../fonts/magnesium/font.scss'
import '../scss/main.scss'

ReactDOM.render(Routes, document.getElementById('app'))

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
