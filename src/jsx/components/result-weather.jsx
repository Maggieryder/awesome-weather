import React, {Component} from 'react'
import Chart from './chart'
import { connect } from 'react-redux'


import WeatherIcon from '../../icons/weather-icon.jsx'

class WeatherResult extends Component {
  constructor(props) {
    super(props);
    console.log('PROPS >>', this.props.weather)
    this.state = {
      hrIndex: 0
    }
  }

  renderChart (hourly, unit) {
    const temps = hourly.map(hour => hour.temp[unit])
    const feellikes = hourly.map(hour => hour.feelslike[unit])
    const winds = hourly.map(hour => hour.wspd[unit])
    const winddegrees = hourly.map(hour => hour.wdir.degrees)
    const pop = hourly.map(hour => hour.pop)
    const sky = hourly.map(hour => hour.sky)
    const humidity = hourly.map(hour => hour.humidity)
    //console.log('pop, sky, humidity', pop, sky, humidity)

    return (
      <Chart data={temps} color="rgba(255,255,255,.6)" height={100} width={300} />
    )
  }

  componentWillReceiveProps (nextProps){
    console.log('NEXT PROPS', nextProps)
    this.setState({
      unitIndex: nextProps.unit,
      tempUnitTxt: (nextProps.unit==='metric') ? 'C' : 'F',
      spdUnitTxt: (nextProps.unit==='metric') ? ' km/h' : ' mph',
    })
  }

  renderWindStr (spd/*, gust*/) {
    let str
    switch (spd){
      case 'Calm':
      //case 'Variable':
      str = spd.toLowerCase()
      break
      default:
      //str = gust > spd ? spd +' - '+gust : spd
      str = spd
    }
    return str
  }

  renderHour = (hr, id) => {
      if (id < 24){
        let date = hr.FCTTIME
        return <li
                  key={id}
                  className={parseInt(date.hour)%6===0 ? "marker" : null}
                  onMouseOver={() => {this.setState({hrIndex:id})}} >
                    <div>{date.hour==='0' ? 'A' : date.hour==='12' ? 'P' : ''}
                  </div>
                </li>
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
    let {hrIndex} = this.state
    let {forecast, hourly, location, sunphase, unit} = this.props.weather
    console.log('this.props.weather.unit', unit)
    let tempUnitTxt = unit==='metric' ? 'C' : 'F',
    spdUnitTxt = unit==='metric' ? ' km/h' : ' mph',
    hourlyDay1 = hourly.slice(0,24),
    date = hourly[hrIndex].FCTTIME,
    isDark = this.afterdark(sunphase, date.hour)
    //console.log('isDark',isDark)
    //console.log('unitTxt',unitTxt)

    return (
      <div style={{textAlign:'center'}}>
        <div className="row">
          <div className="col-sm-6 col-xs-12">
            <h2>{location.city +', '+(location.state ? location.state : location.country)}</h2>
          </div>{/*end col*/}
        </div>{/*end row*/}

        <div className="row">
          <div className="col-sm-6 col-xs-12">
            <h3 style={{margin:'20px 0 5px 0'}}>{date.weekday_name}, {date.civil}</h3>
            <p>{date.month_name+' '+date.mday+', '+date.year}</p>
          </div>{/*end col*/}
        </div>{/*end row*/}

        <div className="row">
          <div className="col-sm-6 col-xs-12">
            <div style={{width:'200px', height:'150px', margin: '0 auto'}}>
              <WeatherIcon stroke="2" desc={hourly[hrIndex].icon} isDark={isDark}/>
            </div>
            <h3 style={{margin:'0 0 20px 0'}}>{hourly[hrIndex].wx}</h3>{/*hourly[hrIndex].condition*/}
          </div>
          <div className="container">
          <div className="col-sm-6 col-xs-12" style={{padding:'5px 10px'}}>
            <ul className="inline" style={{height:'75px'}}>
              <li><a href="#" ><span className='degree-large'>{hourly[hrIndex].temp[unit]}&deg;</span></a></li>
              <li><a href="#" ><span>{hourly[hrIndex].wdir.dir} <br />{this.renderWindStr(hourly[hrIndex].wspd[unit]/*,  hourly[hrIndex].gust[unit]*/)}{spdUnitTxt}</span></a></li>
              <li><a href="#" ><span class="glyphicon glyphicon-tint" aria-hidden="true"></span><span className='degree-large'>{hourly[hrIndex].pop}%</span></a></li>
            </ul>
            {/*<p>Feels like {now.feel}&deg;{unitTxt}</p>*/}
          </div> {/*end col*/}
          </div>
        </div>{/*end row*/}

        <div className="row" style={{position:'relative', margin:0, height:'100px'}}>


            {this.renderChart(hourlyDay1, unit)}
            <ul className="hours" >
              {hourlyDay1.map(this.renderHour)}
            </ul>

        </div>
      </div>
    )
  }
}

function mapStateToProps({weather}){
  console.log('weather', weather)
  return { weather }
}

export default connect(mapStateToProps)(WeatherResult)
