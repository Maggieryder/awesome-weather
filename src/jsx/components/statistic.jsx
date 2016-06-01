import React from 'react';
import Bootstrap, { Modal, OverlayTrigger, Tooltip, Popover, Nav, NavDropdown, MenuItem } from 'react-bootstrap';

let suffixes = (type, unit) => {
  switch (type){
    case "temps" :
    case "feels" :
    return <span key="deg"><sup>&deg;</sup></span>
    //return unit==='metric' ? <span key="deg"><sup>&deg;C</sup></span> : <span key="deg"><sup>&deg;F</sup></span>
    case "winds" :
    return unit==='metric' ? <span key="wspd" className="small"> km/h</span> : <span key="wspd" className="small"> mph</span>
    //return unit==='metric' ? <span key="wspd"> km/h</span> : <span key="wspd"> mph</span>
    default:
    return <span key="perc"><sup>&#37;</sup></span>
    //return <span key="perc">&#37;</span>
  }
}

let labels = {
  temps:'Temperature',
  precips:'Precipitation',
  winds:'Windspeed',
  humidities:'Humidity',
  skies:'Cloud coverage',
  feels:'Feels like',
  dewpoints:'Dew points',
  pressures:'Pressure',
  uvas:'UVA'
}

let unusedStats = [];


export default (props) => {
  let popover = <Popover id="popover" title="Choose Stat" >
                  <ul>
                    <li>Other Stat</li>
                    <li>Another Stat</li>
                    <li>Last Stat</li>
                  </ul>
                </Popover>;



  let changeStat = () => {
    console.log('hi!')
  }

  //let title = labels[props.type]+' '+ suffixes(props.type, props.unit);

  return (

    <li className={'stat '+props.active+' '+props.type} >
      {/*<div class="dropdown">
        <button className="label btn dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true"><div>{labels[props.type]} {suffixes(props.type, props.unit)}<span className="caret"></span></div></button>
        <ul class="dropdown-menu" aria-labelledby="dropdownMenu1">
          <li><a href="#">Other param</a></li>
          <li><a href="#">Another param</a></li>
          <li><a href="#">Last param</a></li>
        </ul>
      </div>*/}
      <Nav>
        <NavDropdown className="label"  title={labels[props.type]} id="nav-dropdown">
          <MenuItem eventKey="1">Dewpoint</MenuItem>
          <MenuItem eventKey="2">Pressure</MenuItem>
          <MenuItem eventKey="3" active>UVA</MenuItem>
        </NavDropdown>
      </Nav>
      <div className="reading">
        <a href="#" onClick={props.onClick}>
          <span>{props.data}{suffixes(props.type, props.unit)}</span>
        </a>
      </div>
    </li>
  )
}
