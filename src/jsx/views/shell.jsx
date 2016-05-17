import React from 'react'

import Header from './header.jsx'
import Footer from './footer.jsx'

export default (props) => {
  return (
    <div>
      <Header />
      <div id="content">
        {props.children}
      </div>
      <Footer />
    </div>
  )
}
