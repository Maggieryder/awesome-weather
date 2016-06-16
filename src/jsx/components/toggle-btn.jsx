import React, {Component} from 'react'

class ToggleBtn extends Component {
  constructor(props) {
    super(props);
    //console.log('ToggleBtn PROPS >>', props)
    this.state = {toggle:props.state};
  }

  componentWillReceiveProps(nextProps){
    //console.log('ToggleBtn componentWillReceiveProps', nextProps)
    this.setState({toggle:nextProps.state})
  }

  handleToggle = () => {
    let toggle = this.state.toggle===0 ? 1 : 0;
    this.setState({toggle:toggle})
    this.props.toggleFunction(toggle)
  }

  render(){
    const { options } = this.props

    return (
      <button className={`toggle-btn ${this.props.styleClass}`} onClick={this.handleToggle}>
        {this.state.toggle===0 ? options[0] : options[options.length -1]}
      </button>
    )
  }
}

export default ToggleBtn;
