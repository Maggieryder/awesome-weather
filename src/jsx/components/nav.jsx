import React from 'react'
import {Link, IndexLink} from 'react-router'

let Nav = () => {
  let activeStyle = {
    color: '#fff',
    textDecoration: 'none'
  }
  return (
    <nav>
      <ul>
        <li><IndexLink to="/" activeClassName="active" activeStyle={activeStyle} >NOW</IndexLink></li>
        <li><Link to="users/hourly" activeClassName="active" activeStyle={activeStyle} >HOURLY</Link></li>
        <li><Link to="users/3-day" activeClassName="active" activeStyle={activeStyle} >3-DAY</Link></li>
      </ul>
    </nav>
  )
}

export default Nav
