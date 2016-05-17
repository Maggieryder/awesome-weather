import React from 'react'


//const icon = '<svg id="cloudy" data-name="cloudy" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 150"><defs><style>.cls-1,.cls-2{fill:none;}.cls-2{stroke:#fff;stroke-miterlimit:10;stroke-width:4px;}</style></defs><title>icon-cloudy</title><rect class="cls-1" width="200" height="150"/><g id="Cloudy"><path class="cls-2" d="M140.52,63.16a24.07,24.07,0,0,0-4.63.45A39,39,0,0,0,59,67.74c-0.42,0-.84,0-1.27,0-12,0-21.69,11.07-21.69,23S45.71,114,57.69,114h82.83c13.23,0,24-12.19,24-25.42S153.75,63.16,140.52,63.16Z"/></g></svg>'
export default ({location, now, unit}) => {
  let tUnit = (unit==='metric') ? 'C' : 'F'
  let imgStyle = {
    width: '300px',
    height:'225px'
  }
  let pStyle = {
    fontSize: '.9em',
    lineHeight: '.8em'
  }
  return (
    <div>
      <div className="row">
        <div className="col-sm-6 col-xs-12">
          <h2>Current conditions:</h2>
        </div>{/*end col*/}
      </div>{/*end row*/}
      <div className="row">
        <div className="col-sm-6 col-xs-12" style={{textAlign:'center'}}>
          <img src='../../images/icon-partly-cloudy-night.svg' alt={now.desc+' image'} style={imgStyle}/>
        </div>
        <div className="col-sm-6 col-xs-12" style={{padding:'5px 10px'}}>
          <p style={pStyle}>{now.desc}</p>
          <p className='degree-large'>{now.temp}&deg;{tUnit}</p>
          <p style={pStyle}>Wind: {now.windspd==='Calm' ? 'calm' : now.winddir+' at '+ now.windspd +' gusting to '+now.gust }</p>
          <p style={pStyle}>Feels like {now.feel}&deg;{tUnit}</p>
          <p style={pStyle}>Precipitation: {now.precip}</p>
        </div> {/*end col*/}
      </div>{/*end row*/}
    </div>
  )
}
