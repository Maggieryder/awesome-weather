import React, {Component} from 'react'

class ToggleBtn extends Component {
  constructor(props) {
    super(props);
    this.state = {toggle:0};
  }

  handleToggle = (e) => {
    let toggle = this.state.toggle===0 ? 1 : 0;
    this.setState({toggle:toggle})
    this.props.toggleFunction(toggle)
  }

  render(){
    const { options } = this.props

    return (
      <button className={`toggle-btn ${this.props.styleClass}`} onClick={this.handleToggle}>
        {this.state.toggle===0 ? options[0] : options[1]}
      </button>
    )
  }
}

export default ToggleBtn;
