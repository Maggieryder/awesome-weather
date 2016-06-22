import React, {PropTypes} from 'react'

const ClearNight = (props) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" x="0" y="0" viewBox="0 0 200 150" enable-background="new 0 0 200 150">
      <g style={props.style}>
        <path d="M89,66.81a32.57,32.57,0,0,1,11.24-24.64,32.67,32.67,0,1,0,22.95,57.28c-0.49,0-1,0-1.47,0A32.69,32.69,0,0,1,89,66.81Z"/>
      </g>
    </svg>
  )
}

ClearNight.propTypes = {style: PropTypes.object.isRequired}

export default ClearNight;
