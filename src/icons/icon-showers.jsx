import React, {PropTypes} from 'react'

const Showers = (props) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" x="0" y="0" width='100%' height='100%' viewBox="0 0 200 150" preserveAspectRatio="xMidYMid meet" enable-background="new 0 0 200 150">
      <g style={props.style}>
        <path d="M140.52,51.16a24.06,24.06,0,0,0-4.63.45A39,39,0,0,0,59,55.74c-0.42,0-.84,0-1.27,0C45.71,55.7,36,66.27,36,78.25S45.71,101,57.69,101h82.83c13.23,0,24-11.69,24-24.92S153.75,51.16,140.52,51.16Z"/>
        <line x1="69.75" y1="111.47" x2="59.21" y2="122.01"/>
        <line x1="101.97" y1="111.47" x2="91.43" y2="122.01"/>
        <line x1="134.19" y1="111.47" x2="123.66" y2="122.01"/>
      </g>
    </svg>
  )
}

Showers.propTypes = {style: PropTypes.object.isRequired}

export default Showers;
