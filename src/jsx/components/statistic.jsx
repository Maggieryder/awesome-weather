import React from 'react'

let suffixes = (type, unit) => {
  switch (type){
    case "temps" :
    case "feels" :
    return unit==='metric' ? <span key="deg">&deg;C</span> : <span key="deg">&deg;F</span>
    case "winds" :
    //return unit==='metric' ? <span key="wspd" className="small"> km/h</span> : <span key="wspd" className="small"> mph</span>
    return unit==='metric' ? <span key="wspd"> km/h</span> : <span key="wspd"> mph</span>
    default:
    //return <span key="perc"><sup>&#37;</sup></span>
    return <span key="perc">&#37;</span>
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
  let popover = () => {
    return (<div id="popover" title='popover'>
      <div style={{width:"150px"}}>
        <Image style={{borderRadius:'20px'}} src="Stat list" responsive rounded />
      </div>
    </div>);
  }


  let changeStat = () => {
    console.log('hi!')
  }

  return (
    <li className={'stat '+props.active+' '+props.type} >
      <button className="label" onClick={changeStat} >{labels[props.type]} {suffixes(props.type, props.unit)}<span class="caret"></span></button>
      <a href="#" onClick={props.onClick}>
        <span>{props.data}</span>
      </a>
    </li>
  )
}
