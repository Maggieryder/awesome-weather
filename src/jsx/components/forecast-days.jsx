import React, {Component} from 'react'
import { connect } from 'react-redux'
import Bootstrap, { Col } from 'react-bootstrap';

import ForecastDay from './forecast-day.jsx'

class DayForecast extends Component {

  renderDay = (day, id) => {
    let {date, icon, high, low} = day
    let { unit, isLoading } = this.props.weather
    let unitType = unit==='metric' ? 'celsius' : 'fahrenheit'

    if (id < this.props.numDays){
      return !isLoading ? <ForecastDay key={id}
                  id={id}
                  dayIndex={this.props.dayIndex}
                  day={date.weekday_short}
                  temps={[high[unitType],low[unitType]]}
                  icon={icon}
                  onClick={this.props.onSelect.bind(this, id)}
              /> :
              <Col xs={3} key={id}>
                <div style={{height:'74px', paddingTop:'25px'}}>...</div>
              </Col>
    }
  }

  render() {
    let { forecast, isLoading } = this.props.weather
    let days = isLoading ? [{},{},{},{}] : forecast.simpleforecast.forecastday
    const rowStyle = {margin:'6px 4px'}
    return (
      <div className="row" style={rowStyle}>
        {days.map(this.renderDay)}
      </div>
    )
  }
}

function mapStateToProps({weather}){
  return { weather }
}

export default connect(mapStateToProps)(DayForecast)
