import React, { PropTypes } from 'react'

import Header from './header.jsx'
//import Footer from './footer.jsx'

const Shell = (props) => {
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

Shell.propTypes = {
  children: PropTypes.node
}

export default Shell

/*<Footer />*/
