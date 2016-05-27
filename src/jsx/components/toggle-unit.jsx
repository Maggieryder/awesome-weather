import React, {Component} from 'react'
import { connect } from 'react-redux'
import { toggleUnit } from '../../actions/index'

class ToggleBtn extends Component {
  constructor(props) {
    super(props);
    this.state = {toggle:0};
  }

  handleToggle = (e) => {
    //e.preventDefault()
    let toggle = this.state.toggle===0 ? 1 : 0;
    this.setState({toggle:toggle})
    this.props.toggleUnit(toggle)
  }

  render(){

    return (
      <button className="toggle-btn" onClick={this.handleToggle}>
        {this.state.toggle===0 ? <div>&deg;C</div> : <div>&deg;F</div>}
      </button>
    )
  }
}

export default connect(null, {toggleUnit})(ToggleBtn)
