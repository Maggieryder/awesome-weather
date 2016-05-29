import React, {Component} from 'react'
import { connect } from 'react-redux'
import ToggleUnit from './toggle-unit'
import ToggleFavorite from './toggle-favorite'
import DayForecast from './forecast-days'
import Charts from './charts'
import Statistic from './statistic'

import WeatherIcon from '../../icons/weather-icon.jsx'

class WeatherResult extends Component {
  constructor(props) {
    super(props);
    console.log('RESULT PROPS >>', this.props)
    this.state = {
      hrIndex: 0,
      dayIndex: 0,
      chart: 'temps'
    }
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

  handleChartHover = (id) => {
    //console.log('handleChartHover', id)
    this.setState({hrIndex:id})
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
    winddegrees = hourly.map(hour => hour.wdir.dir),
    conditions = hourly.map(hour => hour.wx),
    icons = hourly.map(hour => hour.icon),
    precips = hourly.map(hour => hour.pop),
    skies = hourly.map(hour => hour.sky),
    humidities = hourly.map(hour => hour.humidity),

    isDark = this.afterdark(sunphase, dates[hrIndex].hour)

    const rowStyle = {margin:'8px 4px'}
    //console.log('isDark',isDark)

    return (
      <div style={{textAlign:'center'}}>

        <div className="row" style={{margin:'8px 4px 8px 0'}}>
          <div className="col-xs-2 col-sm-1" style={{padding:'0 0 0 4px'}}>
            <ToggleUnit/>
          </div>{/*end col*/}
          <div className="col-xs-8 col-sm-4" style={{padding:'0 0 0 4px'}}>
            <div className="time"><h3>{dates[hrIndex].weekday_name}, {dates[hrIndex].civil}</h3></div>
            {/*<p>{dates[hrIndex].month_name+' '+dates[hrIndex].mday+', '+dates[hrIndex].year}</p>*/}
          </div>{/*end col*/}
          <div className="col-xs-2 col-sm-1" style={{padding:'0 0 0 4px'}}>
            <ToggleFavorite location={location}/>
          </div>{/*end col*/}
          <div className="col-xs-12 col-sm-6" style={{padding:'0 0 0 4px'}}>
            <p>{dates[hrIndex].month_name+' '+dates[hrIndex].mday+', '+dates[hrIndex].year}</p>
          </div>{/*end col*/}
        </div>{/*end row*/}

        <div className="row" style={{margin:'-10px'}}>
          <div className="col-xs-8 col-xs-offset-2 col-sm-4 col-sm-offset-1">
            <div style={{width:'200px', height:'150px', margin: '-5px auto'}}>
              <WeatherIcon stroke="2" opacity={.8} desc={icons[hrIndex]} isDark={isDark}/>
            </div>
            <h3 style={{margin:'0 0 15px'}}>{conditions[hrIndex]}</h3>
          </div>{/*end col*/}
        </div>

        <div className="footer">
          <div className="row" style={rowStyle}>
            <div className="col-sm-2 col-xs-4"  style={{padding:'0 0 0 4px'}}>
              <Statistic type="temps" unit={unit} data={temps[hrIndex]} onClick={() => {this.setState({chart:'temps'})}} active={this.state.chart==='temps' ? 'active' : null} />
            </div>
            <div className="col-sm-2 col-xs-4" style={{padding:'0 0 0 4px'}}>
              <Statistic type="winds" unit={unit} data={winddegrees[hrIndex]+' '+winds[hrIndex]} onClick={() => {this.setState({chart:'winds'})}} active={this.state.chart==='winds' ? 'active' : null} />
            </div>
            <div className="col-sm-2 col-xs-4" style={{padding:'0 0 0 4px'}}>
              <Statistic type="precips" data={precips[hrIndex]} onClick={() => {this.setState({chart:'precips'})}} active={this.state.chart==='precips' ? 'active' : null} />
            </div>
            <div className="col-sm-2 col-xs-4"  style={{padding:'0 0 0 4px'}}>
              <Statistic type="feels" unit={unit} data={feellikes[hrIndex]} onClick={() => {this.setState({chart:'feels'})}} active={this.state.chart==='feels' ? 'active' : null} />
            </div>
            <div className="col-sm-2 col-xs-4" style={{padding:'0 0 0 4px'}}>
              <Statistic type="skies" data={skies[hrIndex]} onClick={() => {this.setState({chart:'skies'})}} active={this.state.chart==='skies' ? 'active' : null} />
            </div>
            <div className="col-sm-2 col-xs-4" style={{padding:'0 0 0 4px'}}>
              <Statistic type="humidities" data={humidities[hrIndex]} onClick={() => {this.setState({chart:'humidities'})}} active={this.state.chart==='humidities' ? 'active' : null} />
            </div>
          </div>
          <Charts chart={this.state.chart} onMouseOver={this.handleChartHover}/>
          <DayForecast numDays={5}/>
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


/*
<div className="row">
  <div className="col-sm-6 col-xs-12">
    <h2>{location.city +', '+(location.state ? location.state : location.country)}</h2>
  </div>{/*end col}
</div>{/*end row}
*/
