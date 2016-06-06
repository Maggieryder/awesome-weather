import React, {Component} from 'react'
import { connect } from 'react-redux'
import Bootstrap, { Row } from 'react-bootstrap';

import ForecastDay from './forecast-day.jsx'

class DayForecast extends Component {

  renderDay = (day, id) => {
    let {date, icon, high, low} = day
    let { unit, isLoading, response } = this.props.weather
    let unitType = unit==='metric' ? 'celsius' : 'fahrenheit'

    if (id < this.props.numDays){
      return <ForecastDay key={id}
                  id={id}
                  dayIndex={this.props.dayIndex}
                  day={!isLoading && !response.error ? date.weekday_short : null }
                  temps={!isLoading && !response.error ? [high[unitType],low[unitType]] : [null, null] }
                  icon={!isLoading && !response.error ? icon : null }
                  onClick={this.props.onSelect.bind(this, id)}
              />
    }
  }

  render() {
    let { forecast, isLoading, response } = this.props.weather
    let days = isLoading || response.error ? [{},{},{},{}] : forecast.simpleforecast.forecastday
    const rowStyle = {margin:'6px 4px'}
    return (
      <Row style={rowStyle}>
        {days.map(this.renderDay)}
      </Row>
    )
  }
}

function mapStateToProps({weather}){
  return { weather }
}

export default connect(mapStateToProps)(DayForecast)
