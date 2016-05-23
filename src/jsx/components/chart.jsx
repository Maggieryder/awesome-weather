import React from 'react'
import { Sparklines, SparklinesLine, SparklinesBars/*, SparklinesReferenceLine*/ } from 'react-sparklines'

export default (props) => {
  const svgStyle = {
    width:'100%',
    height:'100%',
    position:'relative',
  }
  const svgWidth = $('#chart').width()
  const svgHeight = $('#chart').height()
  return (
    <div id="chart" style={svgStyle}>
      <Sparklines height={svgHeight} width={svgWidth} data={props.data} preserveAspectRatio="none">
        <SparklinesLine style={{ stroke:'rgba(255,255,255,.6)', fill: "#fff", fillOpacity: ".05" }}/>
      </Sparklines>
    </div>
  )
}

/*<SparklinesReferenceLine type="avg" />*/
