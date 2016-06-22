import React, {PropTypes} from 'react'

const Haze = (props) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" x="0" y="0" viewBox="0 0 200 150" enable-background="new 0 0 200 150">
      <g style={props.style}>
        <path d="M36,86.08s27.62,16.08,64,0,64.48,0,64.48,0"/>
        <path d="M36,101.08s27.62,16.08,64,0,64.48,0,64.48,0"/>
        <path d="M36,116.08s27.62,16.08,64,0,64.48,0,64.48,0"/>
        <g>
          <line x1="108" y1="21" x2="108" y2="31"/>
          <line x1="52" y1="78" x2="62" y2="78"/>
          <line x1="69.99" y1="37.12" x2="77" y2="44.13"/>
          <line x1="142.15" y1="42.89" x2="149.16" y2="35.88"/>
          <path d="M142,71.56A32.71,32.71,0,1,0,77.82,84"/>
        </g>
      </g>
    </svg>
  )
}

Haze.propTypes = {style: PropTypes.object.isRequired}

export default Haze;
