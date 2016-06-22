import React, {Component, PropTypes} from 'react'

class Users extends Component {
  constructor(props) {
    super(props)
  }
  render(){
    return (
      <div>
        <h2>Users page</h2>
        {this.props.children}
      </div>
    )
  }
}

Users.propTypes = {
  children: PropTypes.node
}

export default Users
