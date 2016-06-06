import React from 'react';
import Bootstrap, { Nav, NavDropdown, MenuItem } from 'react-bootstrap';

let unusedTypes = [ 'dewpoints', 'pressures', 'uvis'];

let suffixes = (type, unit) => {
  switch (type){
    case "degrees":
    return <sup>&deg;</sup>
    case "speed" :
    return unit==='metric' ? <span className="small"> km/h</span> : <span className="small"> mph</span>
    case "percentage":
    return <sup>&#37;</sup>
    case "measure":
    return unit==='metric' ? <span className="small">mm</span> : <sup>&Prime;</sup>
    default:
    return null
  }
}
export default (props) => {

  let { type, data, label, suffix, unit, active, isLoading, hasError } = props

  let handleSelect = (e) => {
    props.onLabelChange(unusedTypes[e])
    props.onClick(type);
  }

  let handleClick = (e) => {
    props.onClick(type);
  }

  return (

    <li className={'meter'+active} >
      <Nav>
        <NavDropdown className="label" title={label} id="nav-dropdown">
        <MenuItem eventKey="0" onSelect={handleSelect}>{unusedTypes[0]}</MenuItem>
          <MenuItem eventKey="1" onSelect={handleSelect}>{unusedTypes[1]}</MenuItem>
          <MenuItem eventKey="2" onSelect={handleSelect}>{unusedTypes[2]}</MenuItem>
        </NavDropdown>
      </Nav>
      <div className="reading">
        <a href="#" onClick={handleClick}>
          {!isLoading && !hasError ? <span>{data}{suffixes(suffix, unit)}</span> : <span>...</span>}
        </a>
      </div>
    </li>
  )
}

/*
let popover = <Popover id="popover" title="Choose meter" >
                <ul>
                  <li>Other meter</li>
                  <li>Another meter</li>
                  <li>Last meter</li>
                </ul>
              </Popover>;
*/
