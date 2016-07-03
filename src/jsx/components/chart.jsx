import React, { Component, PropTypes } from 'react'
import Chartist from 'chartist'
import ChartistGraph from 'chartist-line'

import coords from '../utils/coords.js'

import 'css!sass!chartist/dist/scss/chartist.scss'

//React.initializeTouchEvents(true);

class Chart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      percent: '0%'
    }
  }


  onDraw (data, color) {
    if (data.type === 'point') {
      if (data.element.node.parentNode.querySelectorAll('line')[this.state.index] === data.element.node) {
        data.element.attr({
            style: 'stroke: ' + color + '; stroke-width: 8'
        });
      } else {
        data.element.attr({
            style: 'display: none'
        });
      }
    }
  }

  render(){
    let { width, height } = this.props;
    //console.log(this.props)
    let datatosort = this.props.data.slice()
    let sorteddata = datatosort.sort(function(a, b){return a - b}) // sorts into numerical min and max values
    //console.log(sorteddata)
    let data = {
      //labels: Chartist.times(96),
      series: [this.props.data]
    }
    let options = {
      width: width,
      height: height,
      low: sorteddata[0],
      high: sorteddata[sorteddata.length-1],
      showArea: true,
      axisX: {
        offset: -4,
        showGrid: false,// this one to show vertical lines
        showLabel: false
      },
      axisY: {
        offset: -10,
        showGrid: false,
        showLabel: false
      },
      lineSmooth: Chartist.Interpolation.simple({
        divisor: 5
      })
    }

    let listener : {
      //draw: (data) => {
      //  self.onDraw(data, 'red');
      //}
    }

    return (
      <div>
        <ChartistGraph
                className={'ct-hours'}
                data={data}
                options={options}
                listener={listener}
                type='Line'
                />
      </div>
    )
  }

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
