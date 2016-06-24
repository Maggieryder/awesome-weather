import React, { PropTypes } from 'react'
import { Sparklines, SparklinesCurve /*, SparklinesSpots, SparklinesBars/*, SparklinesReferenceLine*/ } from 'react-sparklines'

const Chart = (props) => {

  let chartStyle = {
    stroke: props.color,
    strokeWidth: props.stroke,
    fill: props.fill,
    fillOpacity: props.opacity
  }

  return (
    <Sparklines height={props.height} width={props.width} data={props.data} preserveAspectRatio='none' >
      <SparklinesCurve style={chartStyle}/>
    </Sparklines>
  )
}

Chart.propTypes = {
  data: PropTypes.array.isRequired,
  height: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  color: PropTypes.string,
  stroke: PropTypes.string,
  fill: PropTypes.string,
  opacity: PropTypes.string
}

Chart.defaultProps = {
  color: 'rgba(255,255,255,.5)',
  stroke: '1px',
  fill: '#fff',
  opacity: '.05'
}

export default Chart

/*<SparklinesReferenceLine type="avg" />
<SparklinesSpots size={4}
  style={{ stroke: "red", strokeWidth: 3, fill: "white" }} />*/
