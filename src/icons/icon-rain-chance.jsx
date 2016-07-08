import React, {PropTypes} from 'react'

const ChanceRain = (props) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" x="0" y="0" width='100%' height='100%' viewBox="0 0 200 150" preserveAspectRatio="xMidYMid meet" enable-background="new 0 0 200 150">
      <g style={props.style}>
        <path d="M140.52,51.16a24.06,24.06,0,0,0-4.63.45A39,39,0,0,0,59,55.74c-0.42,0-.84,0-1.27,0C45.71,55.7,36,66.27,36,78.25S45.71,101,57.69,101h82.83c13.23,0,24-11.69,24-24.92S153.75,51.16,140.52,51.16Z"/>
        <line x1="65.75" y1="111.47" x2="55.21" y2="122.01"/>
        <line x1="76.49" y1="121.8" x2="65.95" y2="132.33"/>
        <line x1="97.97" y1="111.47" x2="87.43" y2="122.01"/>
        <line x1="107.06" y1="121.8" x2="96.52" y2="132.33"/>
        <line x1="130.19" y1="111.47" x2="119.66" y2="122.01"/>
        <line x1="138.04" y1="121.8" x2="127.51" y2="132.33"/>
      </g>
      <g style={props.style}>
        <path d="M87.43,59.3S87.36,46.15,99.24,46.15c10.37,0,11.61,7.41,11.18,11.53-0.65,6.17-7.79,8.44-10.18,13.8a18.13,18.13,0,0,0-1.24,6"/>
        <line x1="98.96" y1="82.31" x2="98.96" y2="84.91"/>
      </g>
    </svg>
  )
}

ChanceRain.propTypes = {style: PropTypes.object.isRequired}

export default ChanceRain;
