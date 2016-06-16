import React, {Component} from 'react'
import { connect } from 'react-redux'
import { Row } from 'react-bootstrap';

import ForecastDay from './forecast-day.jsx'

class DayForecast extends Component {

  renderDay = (day, id) => {
    let {date, icon, high, low} = day
    let { unit, isLoading, response } = this.props.weather
    let validData = !isLoading && !response.error && !response.results
    let unitType = unit==='metric' ? 'celsius' : 'fahrenheit'

    if (id < this.props.numDays){
      return <ForecastDay key={id}
                  id={id}
                  dayIndex={this.props.dayIndex}
                  day={validData ? date.weekday_short : null }
                  temps={validData ? [high[unitType],low[unitType]] : [null, null] }
                  icon={validData ? icon : null }
                  onClick={this.props.onSelect.bind(this, id)}
              />
    }
  }

  render() {
    let { forecast, isLoading, response } = this.props.weather
    let days = isLoading || response.error || response.results ? [{},{},{},{}] : forecast.simpleforecast.forecastday //hack attack!!
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
