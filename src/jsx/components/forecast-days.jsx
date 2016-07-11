import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Row } from 'react-bootstrap';

import ForecastDay from 'forecast-day.jsx'

class DaysForecast extends Component {
  constructor(props) {
    super(props);
    this.onSelect = this.props.onSelect
  }

  renderDay = (day, id) => {
    let { date, icon, high, low } = day
    let { dayIndex, numDays, unit } = this.props
    let { isLoading, response } = this.props.weather
    let validData = !isLoading && !response.error && !response.results
    let unitType = unit==='metric' ? 'celsius' : 'fahrenheit'

    if (id < numDays){
      return <ForecastDay key={id}
                  id={id}
                  dayIndex={dayIndex}
                  day={validData ? date.weekday_short : '' }
                  temps={validData ? [high[unitType],low[unitType]] : [null, null] }
                  icon={validData ? icon : '' }
                  onClick={this.onSelect}
              />
    }
  }

  render() {
    //console.log('rendering DAYS')
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

DaysForecast.propTypes = {
  onSelect: PropTypes.func.isRequired,
  numDays: PropTypes.number,
  dayIndex: PropTypes.number.isRequired,
  weather: PropTypes.object.isRequired,
  unit: PropTypes.string.isRequired
}
DaysForecast.defaultProps = {
  numDays: 4,
  dayIndex: 0,
  weather: {},
  unit:'metric'
}

function mapStateToProps({ weather, unit }){
  return { weather, unit }
}

export default connect(mapStateToProps)(DaysForecast)
