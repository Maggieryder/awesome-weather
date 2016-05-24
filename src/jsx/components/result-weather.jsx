import React, {Component} from 'react'
import Chart from './chart'
import { connect } from 'react-redux'


import WeatherIcon from '../../icons/weather-icon.jsx'

class WeatherResult extends Component {
  constructor(props) {
    super(props);
    console.log('PROPS >>', this.props.weather)
    this.state = {
      hrIndex: 0,
      dayIndex: 0,
      chart: 'temps'
    }
  }

  renderChart (data, unit) {
    /*const temps = hourly.map(hour => hour.temp[unit])
    const feellikes = hourly.map(hour => hour.feelslike[unit])
    const winds = hourly.map(hour => hour.wspd[unit])
    const winddegrees = hourly.map(hour => hour.wdir.degrees)
    const pop = hourly.map(hour => hour.pop)
    const sky = hourly.map(hour => hour.sky)
    const humidity = hourly.map(hour => hour.humidity)
    //console.log('pop, sky, humidity', pop, sky, humidity)*/

    return (
      <Chart data={data} color="rgba(255,255,255,.6)" height={100} width={300} />
    )
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

  renderHour = (date, id) => {
      if (id < 24){
        return <li
                  key={id}
                  className={parseInt(date.hour)%6===0 ? "marker" : null}
                  onMouseOver={() => {this.setState({hrIndex:id})}} >
                    <div>{date.hour==='0' ? 'A' : date.hour==='12' ? 'P' : ''}</div>
                </li>
      }
  }

  renderDay = (day, id) => {
      if (id < 5){
        return <div className="day col-xs-3" key={id}>
                    <div className={this.state.dayIndex===id ? "active" : null}
                        onMouseOver={() => {this.setState({dayIndex:id})}} >
                      <div>{day.date.weekday}</div>
                      <div style={{width:'80px', height:'60px', margin: '0 auto'}}>
                        <WeatherIcon stroke="5" opacity={this.state.dayIndex===id ? 1 : .8} desc={day.icon}/>
                      </div>
                      <div>{day.high.celsius}&deg; / {day.low.celsius}&deg; </div>
                    </div>
                </div>
      }
  }

  afterdark(sp, now){
    let hr = parseInt(now),
    sunrise = parseInt(sp.sunrise.minute)<30 ? parseInt(sp.sunrise.hour) : parseInt(sp.sunrise.hour)+1,
    sunset = parseInt(sp.sunset.minute)<30 ? parseInt(sp.sunset.hour) : parseInt(sp.sunset.hour)+1
    //console.log(hr, sunrise, sunset )
    return ((hr > sunrise ) && (hr < sunset)) ? false : true
  }

  tempUnitTxt(u){
    return u==='metric' ? 'C' : 'F'
  }

  spdUnitTxt(u){
    return u==='metric' ? ' km/h' : ' mph'
  }

  render() {
    let {hrIndex} = this.state
    let {forecast, hourly, location, sunphase, unit} = this.props.weather

    let dates = hourly.map(hour => hour.FCTTIME),
    temps = hourly.map(hour => hour.temp[unit]),
    feellikes = hourly.map(hour => hour.feelslike[unit]),
    winds = hourly.map(hour => hour.wspd[unit]),
    winddegrees = hourly.map(hour => hour.wdir.degrees),
    conditions = hourly.map(hour => hour.wx),
    icons = hourly.map(hour => hour.icon),
    precips = hourly.map(hour => hour.pop),
    skies = hourly.map(hour => hour.sky),
    humidities = hourly.map(hour => hour.humidity),

    isDark = this.afterdark(sunphase, dates[hrIndex].hour)
    //console.log('isDark',isDark)

    return (
      <div style={{textAlign:'center'}}>
        <div className="row">
          <div className="col-sm-6 col-xs-12">
            <h2>{location.city +', '+(location.state ? location.state : location.country)}</h2>
          </div>{/*end col*/}
        </div>{/*end row*/}

        <div className="row">
          <div className="col-sm-6 col-xs-12">
            <h3 style={{margin:'20px 0 5px 0'}}>{dates[hrIndex].weekday_name}, {dates[hrIndex].civil}</h3>
            <p>{dates[hrIndex].month_name+' '+dates[hrIndex].mday+', '+dates[hrIndex].year}</p>
          </div>{/*end col*/}
        </div>{/*end row*/}

        <div className="container">
          <div className="row">

            <div className="col-sm-6 col-xs-12">
              <div style={{width:'200px', height:'150px', margin: '0 auto'}}>
                <WeatherIcon stroke="2" opacity={.8} desc={icons[hrIndex]} isDark={isDark}/>
              </div>
              <h3 style={{margin:'0 0 20px 0'}}>{conditions[hrIndex]}</h3>
            </div>{/*end col*/}

            <div className="col-sm-6 col-xs-12" style={{padding:'5px 10px'}}>
              <ul className="inline" style={{height:'75px'}}>
                <li className={this.state.chart==='temps' ? 'active' : null}>
                  <a href="#" onClick={() => {this.setState({chart:'temps'})}}>
                    <span className='degree-large'>{temps[hrIndex]}&deg;</span>
                  </a>
                </li>
                <li className={this.state.chart==='winds' ? 'active' : null}>
                  <a href="#" onClick={() => {this.setState({chart:'winds'})}}>
                    <span>{hourly[hrIndex].wdir.dir} <br />{this.renderWindStr(winds[hrIndex])}{this.spdUnitTxt(unit)}</span>
                  </a>
                </li>
                <li className={this.state.chart==='precips' ? 'active' : null}>
                  <a href="#" onClick={() => {this.setState({chart:'precips'})}}>
                    {/*<span className="glyphicon glyphicon-tint" aria-hidden="true"></span>*/}
                    <span className='degree-large'>{precips[hrIndex]}<sup>%</sup></span>
                  </a>
                </li>
              </ul>
              {/*<p>Feels like {now.feel}&deg;{unitTxt}</p>*/}
            </div> {/*end col*/}

          </div>{/*end row*/}
        </div>{/*end container*/}

        <div className="row" style={{position:'relative', margin:0, height:'100px'}}>
            {this.state.chart === 'temps' ? this.renderChart(temps.slice(0,24), unit) : null}
            {this.state.chart === 'winds' ? this.renderChart(winds.slice(0,24), unit) : null}
            {this.state.chart === 'precips' ? this.renderChart(precips.slice(0,24), unit) : null}
            <ul className="hours" >
              {dates.map(this.renderHour)}
            </ul>
        </div>{/*end row*/}
        <div className="row" style={{margin:'8px 4px'}}>
          {forecast.map(this.renderDay)}
        </div>{/*end row*/}
      </div>
    )
  }
}

function mapStateToProps({weather}){
  console.log('weather', weather)
  return { weather }
}

export default connect(mapStateToProps)(WeatherResult)
