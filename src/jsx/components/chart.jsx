import React from 'react'
import { Sparklines, SparklinesCurve/*, SparklinesBars/*, SparklinesReferenceLine*/ } from 'react-sparklines'

export default (props) => {

  return (
    <Sparklines height={props.height} width={props.width} data={props.data} preserveAspectRatio="none">
      <SparklinesCurve style={{stroke:'rgba(255,255,255,.3)', strokeWidth: '2px', fill:'#fff' , fillOpacity: '.05'}}/>
    </Sparklines>
  )
}

/*<SparklinesReferenceLine type="avg" />*/
