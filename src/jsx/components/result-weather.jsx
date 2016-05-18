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
        <div className="col-sm-6 col-xs-12" style={{height:'100%',background:'rgba(0,0,0,.2)'}}>
          <h3 style={{textAlign:'center', marginBottom:'15px'}}>Current conditions:</h3>
        </div>
      </div>
      <div className="row">
        <div className="col-sm-6 col-xs-12" style={{textAlign:'center'}}>
          <div style={{width:'200px', height:'130px', margin: '0 auto'}}>
            <WeatherIcon stroke="2" desc={now.icon} />
          </div>
        </div>
        <div className="col-sm-6 col-xs-12" style={{padding:'5px 10px'}}>
        <h3 style={{textAlign:'center', marginBottom:'20px'}}>{now.desc}</h3>
          <div className="row" style={{height:'100%',background:'rgba(0,0,0,.2)'}}>
            <div className="col-xs-4 col-sm-12" style={{borderRight:'1px solid #243C56'}}><h3 className='degree-large'>{now.temp}&deg;{tUnit}</h3></div>
            <div className="col-xs-4 col-sm-12" style={{borderRight:'1px solid #243C56',textAlign:'center'}}><h3>{now.winddir} <br />{renderWindStr(now.windspd,  now.gust)}</h3></div>
            <div className="col-xs-4 col-sm-12" style={{textAlign:'center'}}><h3>{now.precip}</h3></div>
          </div>
          {/*<p style={pStyle}>Feels like {now.feel}&deg;{tUnit}</p>*/}
        </div> {/*end col*/}
      </div>{/*end row*/}
    </div>
  )
}
