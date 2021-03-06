import React, { Component, PropTypes } from 'react'

class ToggleBtn extends Component {
  constructor(props) {
    super(props);
    //console.log('ToggleBtn PROPS >>', props)
    this.state = {toggle:props.state};
    this.toggleFunction = this.props.toggleFunction.bind(this)
  }

  shouldComponentUpdate(nextProps) {
    if (this.props.state !== nextProps.state) {
      //console.log('ToggleBtn shouldComponentUpdate', this.props.state !== nextProps.state)
    }
   return this.props.state !== nextProps.state
  }

  componentWillReceiveProps(nextProps){
    if (this.props.state !== nextProps.state) {
      //console.log('ToggleBtn componentWillReceiveProps', nextProps)
      this.setState({toggle:nextProps.state})
    }
  }

  handleToggle = () => {
    let toggle = this.state.toggle===0 ? 1 : 0;
    this.setState({toggle:toggle})
    this.toggleFunction(toggle)
  }

  render(){
    //console.log('Toggle RENDERING...', this.props.styleClass)
    const { options, styleClass } = this.props

    return (
      <button className={`toggle-btn ${styleClass}`} onClick={this.handleToggle}>
        {this.state.toggle===0 ? options[0] : options[options.length -1]}
      </button>
    )
  }
}

ToggleBtn.propTypes = {
  state: PropTypes.number,
  options: PropTypes.array.isRequired,
  styleClass: PropTypes.string.isRequired,
  toggleFunction: PropTypes.func.isRequired
}

ToggleBtn.defaultProps = {
  state: 0
}

export default ToggleBtn;
