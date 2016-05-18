import React from 'react'

import WeatherIcon from '../../icons/weather-icon.jsx'


export default ({location, now, unit,time}) => {
  let tUnit = (unit==='metric') ? 'C' : 'F'
  let imgStyle = {
    width: '300px',
    height:'200px'
  }
  let pStyle = {
    fontSize: '.9em',
    lineHeight: '.8em'
  }
  let renderWindStr = (spd, gust) => {
    let str
    switch (spd){
      case 'Calm':
      case 'Variable':
      str = spd.toLowerCase()
      break
      default:
      str = gust > spd ? spd +' - '+gust : spd
    }
    return str
  }

  return (

    <div>
      <div className="row">
        <div className="col-sm-6 col-xs-12" >
          <h3 style={{textAlign:'center', margin:'20px 0 0 0'}}>Current conditions:</h3>
        </div>
      </div>
      <div className="row">
        <div className="col-sm-6 col-xs-12">
          <div style={{width:'200px', height:'150px', margin: '0 auto'}}>
            <WeatherIcon stroke="2" desc={now.icon} />
          </div>
          <h3 style={{textAlign:'center', margin:'0 0 20px 0'}}>{now.desc}</h3>
        </div>
        <div className="col-sm-6 col-xs-12" style={{padding:'5px 10px'}}>


          <ul className="inline" style={{height:'75px'}}>
            <li><a href="#" ><span className='degree-large'>{now.temp}&deg;{tUnit}</span></a></li>
            <li><a href="#" ><span>{now.winddir} <br />{renderWindStr(now.windspd,  now.gust)}</span></a></li>
            <li><a href="#" ><span>{now.precip}</span></a></li>
          </ul>

          {/*<p style={pStyle}>Feels like {now.feel}&deg;{tUnit}</p>*/}
        </div> {/*end col*/}
      </div>{/*end row*/}
    </div>
  )
}
