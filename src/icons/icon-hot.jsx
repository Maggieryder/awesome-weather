import React, {PropTypes} from 'react'

const Hot = (props) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" x="0" y="0" viewBox="0 0 200 150" enable-background="new 0 0 200 150">
      <g style={props.style}>
        <path d="M68,94c15.83,22.79,0,35,0,35"/>
        <path d="M81,75.18C81.06,80.3,82.85,86.59,88,94c15.83,22.79,0,35,0,35"/>
        <path d="M108,59s-15.83,12.21,0,35,0,35,0,35"/>
        <path d="M128,59s-15.83,12.21,0,35,0,35,0,35"/>
        <path d="M168,94c15.83,22.79,0,35,0,35"/>
        <path d="M141,75.18c0.09,5.12,1.88,11.41,7,18.82,15.83,22.79,0,35,0,35"/>
        <path d="M57.31,90.85A29.08,29.08,0,1,1,100,52.69"/>
        <line x1="76.98" y1="17" x2="77.19" y2="26.91"/>
        <line x1="22" y1="74.37" x2="31.91" y2="74.16"/>
        <line x1="37.96" y1="34.23" x2="45.12" y2="41.09"/>
        <line x1="110.22" y1="38.47" x2="117.08" y2="31.31"/>
        <line x1="39.62" y1="112.14" x2="46.48" y2="104.98"/>
      </g>
    </svg>
  )
}

Hot.propTypes = {style: PropTypes.object.isRequired}

export default Hot;
