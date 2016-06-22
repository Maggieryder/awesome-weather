import React, { PropTypes } from 'react'

let User = (props) => {
  return (
    <h2>{props.params.id} view</h2>
  )
}

User.propTypes = {
  params: PropTypes.object
}

export default User
