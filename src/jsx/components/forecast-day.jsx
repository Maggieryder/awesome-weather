import React from 'react';
import Bootstrap, { Col } from 'react-bootstrap';

import WeatherIcon from '../../icons/weather-icon.jsx'

export default (props) => {

  let { id, dayIndex, day, temps, icon, onClick } = props

  let iconStyleActive = { opacity:1 }

  return (
    <Col xs={3} className="day">
        <div className={dayIndex===id ? "active" : null}
            onClick={onClick} >
          <div>{day}</div>
          <div className="icon" style={dayIndex===id ? iconStyleActive : null}>
            <WeatherIcon stroke="7" opacity={1} desc={icon}/>
          </div>
          <div>{temps[0]}&deg; / {temps[1]}&deg; </div>
        </div>
    </Col>
  )

}
