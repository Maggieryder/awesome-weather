import React, {PropTypes} from 'react'

const MostlyCloudy = (props) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" x="0" y="0" viewBox="0 0 200 150" enable-background="new 0 0 200 150">
      <g style={props.style}>
        <path d="M106.21,33.88a39,39,0,0,0-63.66,26.6c-0.42,0-.84,0-1.27,0A21.79,21.79,0,0,0,42.11,104"/>
        <path d="M155.17,72a24.15,24.15,0,0,0-4.63.45,39,39,0,0,0-76.93,4.13c-0.42,0-.84,0-1.27,0-12,0-21.69,10.63-21.69,22.61S60.36,122,72.34,122h82.83c13.23,0,24-11.75,24-25S168.41,72,155.17,72Z"/>
      </g>
    </svg>
  )
}

MostlyCloudy.propTypes = {style: PropTypes.object.isRequired}

export default MostlyCloudy;
