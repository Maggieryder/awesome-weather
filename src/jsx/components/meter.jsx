import React, { Component } from 'react';
import { Nav, NavDropdown, MenuItem } from 'react-bootstrap';

let unusedTypes = [ 'dewpoints', 'pressures', 'uvis'];

let suffixes = (type, unit) => {
  switch (type){
    case 'degrees':
    return <sup>&deg;</sup>
    case 'speed' :
    return unit==='metric' ? <span className="small">km/h</span> : <span className="small">mph</span>
    case 'percentage':
    return <sup>&#37;</sup>
    case 'measure':
    return unit==='metric' ? <span className="small">mm</span> : <sup>&Prime;</sup>
    default:
    return null
  }
}

class Meter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dropdownOpen:false
    }
  }
  handleSelect = (e) => {
    this.props.onLabelChange(unusedTypes[e])
    this.props.onClick(this.props.type);
    this.setState({dropdownOpen:false})
  }
  handleClick = () => {
    this.props.onClick(this.props.type);
  }
  render(){
    let { data, data2, label, suffix, unit, active, isLoading, hasError } = this.props

    let arrowStyle, arrow, readingClass = 'reading'
    if (data2) {
      //console.log('rendering wind direction', data2)
      arrowStyle = {
        transform: `rotate(${data2}deg)`,
        WebkitTransform: `rotate(${data2}deg)`,
        MozTransform: `rotate(${data2}deg)`,
        OTransform: `rotate(${data2}deg)`,
        MsTransform: `rotate(${data2}deg)`
      }
      readingClass = 'reading windy'
      arrow = <div className="arrow-container">
                <div className='direction' style={arrowStyle}>
                  <div className='line'></div>
                  <div className='arrow'></div>
                </div>
              </div>

    };
    return (
      <li className={'meter'+active} >
        <Nav>
          <NavDropdown className="label" title={label} id="nav-dropdown" onSelect={this.handleSelect} onToggle={()=>{this.setState({dropdownOpen:!this.state.dropdownOpen})}}>
            <MenuItem eventKey="0">{unusedTypes[0]}</MenuItem>
            <MenuItem eventKey="1">{unusedTypes[1]}</MenuItem>
            <MenuItem eventKey="2">{unusedTypes[2]}</MenuItem>
          </NavDropdown>
        </Nav>
        <div className={readingClass} style={{'opacity':this.state.dropdownOpen ? 0 : 1}}>
          <a href="#" onClick={this.handleClick}>
            {!isLoading && !hasError ? <span>{data2 ? arrow : null}{data}{suffixes(suffix, unit)}</span> : <span>...</span>}
          </a>
        </div>
      </li>
    )
  }
}

export default Meter

/*
let popover = <Popover id="popover" title="Choose meter" >
                <ul>
                  <li>Other meter</li>
                  <li>Another meter</li>
                  <li>Last meter</li>
                </ul>
              </Popover>;
*/
