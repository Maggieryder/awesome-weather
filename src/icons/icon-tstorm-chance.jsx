import React, {PropTypes} from 'react'

const ChanceTStorm = (props) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" x="0" y="0" viewBox="0 0 200 150" enable-background="new 0 0 200 150">
      <g style={props.style}>
        <path d="M115,101h25.52c13.23,0,24-11.74,24-25s-10.73-24.57-24-24.57a24.19,24.19,0,0,0-4.63.25A39,39,0,0,0,59,55.7c-0.42,0-.84-0.06-1.27-0.06-12,0-21.69,10.6-21.69,22.58S45.71,101,57.69,101H79"/>
        <line x1="100.87" y1="96.34" x2="92.35" y2="104.87"/>
        <line x1="104.45" y1="105.53" x2="95.92" y2="114.06"/>
        <line x1="104" y1="105" x2="92" y2="105"/>
      </g>
      <g style={props.style}>
        <path d="M87.43,59.3S87.36,46.15,99.24,46.15c10.37,0,11.61,7.41,11.18,11.53-0.65,6.17-7.79,8.44-10.18,13.8a18.13,18.13,0,0,0-1.24,6"/>
        <line x1="98.96" y1="82.31" x2="98.96" y2="84.91"/>
      </g>
    </svg>
  )
}

ChanceTStorm.propTypes = {style: PropTypes.object.isRequired}

export default ChanceTStorm;
