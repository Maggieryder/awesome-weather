import React from 'react'

import Header from './header.jsx'
//import Footer from './footer.jsx'

export default (props) => {
  //console.log('SHELL props', props)
  return (
    <div>
      <Header />
      <div id="content">
        {props.children}
      </div>

    </div>
  )
}

/*<Footer />*/
