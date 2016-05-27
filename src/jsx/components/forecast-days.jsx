import React, {Component} from 'react'
import { connect } from 'react-redux'

import WeatherIcon from '../../icons/weather-icon.jsx'

class DayForecast extends Component {
  constructor(props) {
    super(props);
    this.state = {dayIndex:0};
  }

  handleDayClick(id){
    this.setState({dayIndex:id})
    //console.log('CLICKED DAY ID', id)
  }

  renderDay = (day, id) => {
    let {date, icon, high, low} = day
    let unit = this.props.weather.unit==='metric' ? 'celsius' : 'fahrenheit'
    let iconStyleActive = {
      opacity:1
    }
    if (id < this.props.numDays){
      return  <div className="day col-xs-3" key={id}>
                <div className={this.state.dayIndex===id ? "active" : null}
                    onClick={this.handleDayClick.bind(this, id)} >
                  <div>{date.weekday_short}</div>
                  <div className="icon" style={this.state.dayIndex===id ? iconStyleActive : null}>
                    <WeatherIcon stroke="7" opacity={1} desc={icon}/>
                  </div>
                  <div>{high[unit]}&deg; / {low[unit]}&deg; </div>
                </div>
              </div>
    }
  }

  render() {
    const {forecast, unit} = this.props.weather
    const rowStyle = {margin:'8px 4px'}
    return (
      <div className="row" style={rowStyle}>
        {forecast.map(this.renderDay)}
      </div>
    )
  }
}

function mapStateToProps({weather}){
  return { weather }
}

export default connect(mapStateToProps)(DayForecast)
