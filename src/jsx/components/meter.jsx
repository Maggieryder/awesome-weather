import React, { Component, PropTypes } from 'react';
import { Nav, NavDropdown, MenuItem } from 'react-bootstrap';

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
    case 'pressure':
    return unit==='metric' ? <span className="small">mb</span> : <span className="small">in</span>
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
    this.onClick = this.props.onClick
    this.onLabelChange = this.props.onLabelChange
  }

  shouldComponentUpdate(nextProps, nextState){
    return JSON.stringify(this.props) !== JSON.stringify(nextProps) || this.state !== nextState
  }

  handleSelect = (e) => {
    let { hiddenStats, id } = this.props
    this.onLabelChange(hiddenStats[e], id, e)
    this.onClick(hiddenStats[e].type);
    this.setState({dropdownOpen:false})
  }

  renderDropdown = () => {
    let { label, hiddenStats } = this.props
    //console.log('rendering METER DROPDOWN hiddenStats', hiddenStats[0] )
    return  hiddenStats.length > 0 ? <Nav>
              <NavDropdown className="label" title={label} id="nav-dropdown" onSelect={this.handleSelect} onToggle={()=>{this.setState({dropdownOpen:!this.state.dropdownOpen})}}>
                <MenuItem eventKey="0">{hiddenStats[0].label}</MenuItem>
                <MenuItem eventKey="1">{hiddenStats[1].label}</MenuItem>
                <MenuItem eventKey="2">{hiddenStats[2].label}</MenuItem>
              </NavDropdown>
            </Nav>  : <div className="label">{label}</div>
  }

  render(){
    let { type, data, data2, suffix, unit, active, isLoading, hasError } = this.props
    //console.log('rendering METER hiddenStats', hiddenStats[0] )
    //console.log('rendering METER', type)

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

    }
    return (
      <li className={'meter'+active} >
        {this.renderDropdown()}
        <div className={readingClass} style={{'opacity':this.state.dropdownOpen ? 0 : 1}}>
          <a href="#" onClick={()=>{this.onClick(type)}}>
            {!isLoading && !hasError ? <span>{data2 ? arrow : ''}{data}{suffixes(suffix, unit)}</span> : <span>...</span>}
          </a>
        </div>
      </li>
    )
  }
}

Meter.propTypes = {
  id: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
  unit: PropTypes.string.isRequired,
  data: PropTypes.string.isRequired,
  data2: PropTypes.string,
  label: PropTypes.string.isRequired,
  suffix: PropTypes.string.isRequired,
  active: PropTypes.string.isRequired,
  isLoading: PropTypes.bool.isRequired,
  hasError: PropTypes.bool.isRequired,
  hiddenStats: PropTypes.array,
  onClick: PropTypes.func.isRequired,
  onLabelChange: PropTypes.func
}

export default Meter
