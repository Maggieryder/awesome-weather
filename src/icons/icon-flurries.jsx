import React, {PropTypes} from 'react'

const Flurries = (props) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" x="0" y="0" viewBox="0 0 200 150" enable-background="new 0 0 200 150">
      <g style={props.style}>
        <g>
          <path d="M115,101h25.52c13.23,0,24-11.74,24-25s-10.73-24.57-24-24.57a24.19,24.19,0,0,0-4.63.25,39,39,0,0,0-76.93,4c-0.42,0-.84-0.06-1.27-0.06C45.71,55.63,36,66.23,36,78.21S45.71,101,57.69,101H79"/>
        </g>
        <line x1="95.43" y1="96.98" x2="99.71" y2="106.27"/>
        <line x1="102.39" y1="99.4" x2="93.01" y2="103.73"/>
        <line x1="81.27" y1="113.57" x2="88.07" y2="121.2"/>
        <line x1="88.63" y1="113.85" x2="80.93" y2="120.73"/>
        <line x1="109.97" y1="113.12" x2="115.75" y2="121.56"/>
        <line x1="117.24" y1="114.34" x2="108.72" y2="120.17"/>
      </g>
    </svg>
  )
}

Flurries.propTypes = {style: PropTypes.object.isRequired}

export default Flurries;
