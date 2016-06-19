import React from 'react'
import { Sparklines, SparklinesCurve, SparklinesSpots /*, SparklinesBars/*, SparklinesReferenceLine*/ } from 'react-sparklines'

export default (props) => {

  let chartStyle = {
    stroke:'rgba(255,255,255,.4)',
    strokeWidth: '1px',
    fill:'#fff',
    fillOpacity: '.05'
  }

  return (
    <Sparklines height={props.height} width={props.width} data={props.data} preserveAspectRatio="none" >
      <SparklinesCurve style={chartStyle}/>

    </Sparklines>
  )
}

/*<SparklinesReferenceLine type="avg" />
<SparklinesSpots size={4}
  style={{ stroke: "red", strokeWidth: 3, fill: "white" }} />*/
