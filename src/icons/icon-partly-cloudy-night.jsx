import React, {PropTypes} from 'react'

const PartlyCloudyNight = (props) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" x="0" y="0" width='100%' height='100%' viewBox="0 0 200 150" preserveAspectRatio="xMidYMid meet" enable-background="new 0 0 200 150">
      <g style={props.style}>
        <path d="M162.9,92.23a34,34,0,0,0,4.41-1.87A33.66,33.66,0,0,0,176,84a33.71,33.71,0,0,1-29-57,33.75,33.75,0,0,0-26.58,21.62"/>
        <path d="M125.52,70.71a24.07,24.07,0,0,0-4.63.45A39,39,0,0,0,44,75.29c-0.42,0-.84,0-1.27,0C30.71,75.25,21,86.54,21,98.52S30.71,122,42.69,122h82.83c13.23,0,24-12.41,24-25.65S138.75,70.71,125.52,70.71Z"/>
      </g>
    </svg>
  )
}

PartlyCloudyNight.propTypes = {style: PropTypes.object.isRequired}

export default PartlyCloudyNight;
