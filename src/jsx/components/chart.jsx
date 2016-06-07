import React from 'react'
import { Sparklines, SparklinesCurve/*, SparklinesBars/*, SparklinesReferenceLine*/ } from 'react-sparklines'

export default (props) => {

  let chartStyle = {
    stroke:'rgba(255,255,255,.3)',
    strokeWidth: '1px',
    fill:'#fff',
    fillOpacity: '.05'
  }

  return (
    <Sparklines height={props.height} width={props.width} data={props.data} preserveAspectRatio="none">
      <SparklinesCurve style={chartStyle}/>
    </Sparklines>
  )
}

/*<SparklinesReferenceLine type="avg" />*/
