import React, {Component} from 'react'

import WeatherIcon from '../../icons/weather-icon.jsx'

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      unitIndex: this.props.unit,
      hrIndex: 0
    }
  }

  renderWindStr (spd/*, gust*/) {
    let str
    switch (spd){
      case 'Calm':
      case 'Variable':
      str = spd.toLowerCase()
      break
      default:
      //str = gust > spd ? spd +' - '+gust : spd
      str = spd
    }
    return str
  }

  renderHour (hr, id) {
      if (id < 24){
        return <li key={id} onMouseOver={() => {this.setState({hrIndex:id})}} ><div>{hr.hr24%12}</div></li>
      }
  }

  afterdark(sp, now){
    let hr = parseInt(now),
    sunrise = parseInt(sp.sunrise.hour),
    sunset = parseInt(sp.sunset.hour)
    //console.log(hr, sunrise, sunset )
    return ((hr > sunrise ) && (hr < sunset)) ? false : true
  }

  render() {
    let tUnit = (this.state.unitIndex===0) ? 'C' : 'F',
    hrIndex = this.state.hrIndex,
    unitIndex = this.state.unitIndex,
    hourly = this.props.hourly,
    isDark = this.afterdark(this.props.sun, hourly[hrIndex].hr24)
    //console.log('isDark',isDark)

    return (
      <div>
        <div className="row">
          <div className="col-sm-6 col-xs-12" >
            <h3 style={{textAlign:'center', margin:'20px 0 0 0'}}>{hourly[hrIndex].day}, {hourly[hrIndex].time}</h3>
          </div>
        </div>

        <div className="row">
          <div className="col-sm-6 col-xs-12">
            <div style={{width:'200px', height:'150px', margin: '0 auto'}}>
              <WeatherIcon stroke="2" desc={hourly[hrIndex].icon} isDark={isDark}/>
            </div>
            <h3 style={{textAlign:'center', margin:'0 0 20px 0'}}>{hourly[hrIndex].condition}</h3>
          </div>
          <div className="col-sm-6 col-xs-12" style={{padding:'5px 10px'}}>
            <ul className="inline" style={{height:'75px'}}>
              <li><a href="#" ><span className='degree-large'>{hourly[hrIndex].temp[unitIndex]}&deg;{tUnit}</span></a></li>
              <li><a href="#" ><span>{hourly[hrIndex].wdir} <br />{this.renderWindStr(hourly[hrIndex].wspd[unitIndex]/*,  hourly[hrIndex].gust[unitIndex]*/)}</span></a></li>
              <li><a href="#" ><span class="glyphicon glyphicon-tint" aria-hidden="true"></span><span className='degree-large'>{hourly[hrIndex].pop}</span></a></li>
            </ul>
            {/*<p>Feels like {now.feel}&deg;{tUnit}</p>*/}
          </div> {/*end col*/}
        </div>{/*end row*/}

        <div className="row">
          <div className="col-sm-12" >
            <ul className="hours">
              {hourly.map(this.renderHour.bind(this))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}
