import React, {PropTypes} from 'react'

const Cloudy = (props) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" x="0" y="0" viewBox="0 0 200 150" enable-background="new 0 0 200 150">
      <g style={props.style}>
          <path d="M140.52,63.16a24.07,24.07,0,0,0-4.63.45A39,39,0,0,0,59,67.74c-0.42,0-.84,0-1.27,0-12,0-21.69,11.07-21.69,23S45.71,114,57.69,114h82.83c13.23,0,24-12.19,24-25.42S153.75,63.16,140.52,63.16Z"/>
      </g>
    </svg>
  )
}

Cloudy.propTypes = {style: PropTypes.object.isRequired}

export default Cloudy;
