import React from 'react'
import { Sparklines, SparklinesCurve/*, SparklinesBars/*, SparklinesReferenceLine*/ } from 'react-sparklines'

export default (props) => {
  const svgStyle = {
    width:'100%',
    height:'100%',
    position:'relative',
    borderBottom:'1px solid #fff'
  }
  const svgWidth = $('#chart').width()
  const svgHeight = $('#chart').height()
  return (
    <div id="chart" style={svgStyle}>
      <Sparklines height={svgHeight} width={svgWidth} data={props.data} preserveAspectRatio="none">
        <SparklinesCurve style={{ stroke:'rgba(255,255,255,.3)', strokeWidth: '2px', fill: "#fff", fillOpacity: ".05" }}/>
      </Sparklines>
    </div>
  )
}

/*<SparklinesReferenceLine type="avg" />*/
