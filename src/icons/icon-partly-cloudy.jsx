import React, {PropTypes} from 'react'

const PartlyCloudy = (props) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" x="0" y="0" width="100%" height="100%" viewBox="0 0 200 150" preserveAspectRatio="xMidYMid meet" enable-background="new 0 0 200 150">
      <g style={props.style}>
        <path d="M52.31,85.85A29.08,29.08,0,1,1,95,47.69"/>
        <line x1="71.98" y1="12" x2="72.19" y2="21.91"/>
        <line x1="17" y1="69.37" x2="26.91" y2="69.16"/>
        <line x1="32.96" y1="29.23" x2="40.12" y2="36.09"/>
        <line x1="105.22" y1="33.47" x2="112.08" y2="26.31"/>
        <line x1="34.62" y1="107.14" x2="41.48" y2="99.98"/>
        <path d="M158.08,84a24.08,24.08,0,0,0-4.63.45,39,39,0,0,0-76.93,4.13c-0.42,0-.84,0-1.27,0-12,0-21.69,11.12-21.69,23.1S63.27,135,75.25,135h82.83c13.23,0,24-12.25,24-25.48S171.31,84,158.08,84Z"/>
      </g>
    </svg>
  )
}

PartlyCloudy.propTypes = {style: PropTypes.object.isRequired}

export default PartlyCloudy;
