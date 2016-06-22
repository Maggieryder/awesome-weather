import React, {PropTypes} from 'react'

const Unknown = (props) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" x="0" y="0" viewBox="0 0 200 150" enable-background="new 0 0 200 150">
      <g style={props.style}>
          <path d="M140.52,63.16a24.07,24.07,0,0,0-4.63.45A39,39,0,0,0,59,67.74c-0.42,0-.84,0-1.27,0-12,0-21.69,11.07-21.69,23S45.71,114,57.69,114h82.83c13.23,0,24-12.19,24-25.42S153.75,63.16,140.52,63.16Z"/>
      </g>
      <g style={props.style}>
        <path d="M87.43,69.3S87.36,56.15,99.24,56.15c10.37,0,11.61,7.41,11.18,11.53-0.65,6.17-7.79,8.44-10.18,13.8a18.13,18.13,0,0,0-1.24,6"/>
        <line x1="98.96" y1="92.31" x2="98.96" y2="94.91"/>
      </g>
    </svg>
  )
}

Unknown.propTypes = {style: PropTypes.object.isRequired}

export default Unknown;
