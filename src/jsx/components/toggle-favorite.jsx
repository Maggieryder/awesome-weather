import React, {Component} from 'react'
import { connect } from 'react-redux'
import { toggleFavorite } from '../../actions/index'

class ToggleBtn extends Component {
  constructor(props) {
    super(props);
    this.state = {toggle:0};
  }

  handleToggle = (e) => {
    //e.preventDefault()
    let toggle = this.state.toggle===0 ? 1 : 0;
    this.setState({toggle:toggle})
    this.props.toggleFavorite(this.props.location)
  }

  render(){

    return (
      <button className="toggle-btn" onClick={this.handleToggle}>
        <span className={this.state.toggle===0 ? "glyphicon glyphicon-heart-empty" : "glyphicon glyphicon-heart"} aria-hidden="true" aria-label="Toggle favorite"/>
      </button>
    )
  }
}

export default connect(null, {toggleFavorite})(ToggleBtn)
