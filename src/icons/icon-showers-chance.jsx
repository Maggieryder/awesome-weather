import React, {PropTypes} from 'react'

const ChanceShowers = (props) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" x="0" y="0" viewBox="0 0 200 150" enable-background="new 0 0 200 150">
      <g style={props.style}>
        <path d="M140.52,51.16a24.06,24.06,0,0,0-4.63.45A39,39,0,0,0,59,55.74c-0.42,0-.84,0-1.27,0C45.71,55.7,36,66.27,36,78.25S45.71,101,57.69,101h82.83c13.23,0,24-11.69,24-24.92S153.75,51.16,140.52,51.16Z"/>
        <line x1="69.75" y1="111.47" x2="59.21" y2="122.01"/>
        <line x1="101.97" y1="111.47" x2="91.43" y2="122.01"/>
        <line x1="134.19" y1="111.47" x2="123.66" y2="122.01"/>
      </g>
      <g style={props.style}>
        <path d="M87.43,59.3S87.36,46.15,99.24,46.15c10.37,0,11.61,7.41,11.18,11.53-0.65,6.17-7.79,8.44-10.18,13.8a18.13,18.13,0,0,0-1.24,6"/>
        <line x1="98.96" y1="82.31" x2="98.96" y2="84.91"/>
      </g>
    </svg>
  )
}

ChanceShowers.propTypes = {style: PropTypes.object.isRequired}

export default ChanceShowers;
