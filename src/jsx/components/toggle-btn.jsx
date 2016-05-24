import React, {Component} from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { toggleUnit } from '../../actions/index'

class ToggleBtn extends Component {
  constructor(props) {
    super(props);
    this.state = {toggle:0};
  }

  onToggle = (e) => {
    //e.preventDefault()
    let toggle = this.state.toggle===0 ? 1 : 0;
    this.setState({toggle:toggle})
    this.props.toggleUnit(toggle)
  }

  render(){
    let style = {
      width:'35px',
      height:'35px',
      marginLeft:'-5px',
      marginTop:'-5px',
      padding:'5px 5px 5px 0',
      color:'#fff',
      borderRadius:'4px',
      background:'rgba(255,255,255,.1)',
      border:'1px solid rgba(255,255,255,.3)'
    }
    return (
      <button className="toggle-btn" style={style} onClick={this.onToggle}>
        {this.state.toggle===0 ? <div>&deg;C</div> : <div>&deg;F</div>}
      </button>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ toggleUnit }, dispatch)
}

export default connect(null, mapDispatchToProps)(ToggleBtn)
