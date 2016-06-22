import React, { PropTypes } from 'react'

const Clear = (props) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" x="0" y="0" viewBox="0 0 200 150" enable-background="new 0 0 200 150">
      <g style={props.style}>
        <ellipse cx="101.72" cy="74.81" rx="32.71" ry="32.67"/>
        <line x1="100" y1="121" x2="100" y2="131"/>
        <line x1="100" y1="19" x2="100" y2="29"/>
        <line x1="147" y1="78" x2="156" y2="78"/>
        <line x1="44" y1="78" x2="54" y2="78"/>
        <line x1="134.15" y1="107.27" x2="141.16" y2="114.29"/>
        <line x1="61.99" y1="35.12" x2="69" y2="42.13"/>
        <line x1="134.15" y1="40.89" x2="141.16" y2="33.88"/>
        <line x1="61.99" y1="113.05" x2="69" y2="106.04"/>
      </g>
    </svg>
  )
}

Clear.propTypes = {style: PropTypes.object.isRequired}

export default Clear;
