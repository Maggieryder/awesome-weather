import React from 'react'

let suffixes = (type, unit) => {
  switch (type){
    case "temps" :
    case "feels" :
    return <span key="deg">&deg;</span>
    case "winds" :
    return unit==='metric' ? <span key="wspd" className="small"> km/h</span> : <span key="wspd" className="small"> mph</span>
    default:
    return <span key="perc"><sup>&#37;</sup></span>
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

export default (props) => {
  return (
    <li className={'stat '+props.active+' '+props.type} >
      <div className="label" >{labels[props.type]}</div>
      <a href="#" onClick={props.onClick}>
        <span>{props.data}{suffixes(props.type, props.unit)}</span>
      </a>
    </li>
  )
}
