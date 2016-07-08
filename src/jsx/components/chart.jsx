import React, { Component, PropTypes } from 'react'
import Chartist from 'chartist'
import ChartistGraph from 'chartist-line'


import 'css!sass!chartist/dist/scss/chartist.scss'

//React.initializeTouchEvents(true);

class Chart extends Component {
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate(nextProps){
    return JSON.stringify(this.props) !== JSON.stringify(nextProps);
  }

/*
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
*/
  render(){
    //console.log('RENDER CHART')
    let { width, height } = this.props;
    //console.log(this.props)
    let datatosort = this.props.data.slice()
    let sorteddata = datatosort.sort(function(a, b){return a - b}) // sorts into numerical min and max values
    //console.log(sorteddata[0],sorteddata[sorteddata.length-1])
    let data = {
      //labels: Chartist.times(96),
      series: [this.props.data]
    }
    let options = {
      width: '100%',
      height: '100%',
      low: sorteddata[0],
      high: sorteddata[sorteddata.length-1],
      showArea: true,
      fullWidth: true,
      //stretch: true,
      axisX: {
        offset: 0,
        showGrid: false,// this one to show vertical lines
        showLabel: false
      },
      axisY: {
        offset: 0,
        showGrid: false,
        showLabel: false
      },
      plugins: [
        //Chartist.plugins.ctThreshold({
        //  threshold: 70
        //})
      ],
      lineSmooth: Chartist.Interpolation.simple({
        divisor: 2,
        fillHoles: false
      })
    }

    //let listener : {
      //draw: (data) => {
      //  self.onDraw(data, 'red');
      //}
    //}

    return (
      <div>
        <ChartistGraph
                className={'ct-hours'}
                data={data}
                options={options}
                type='Line'
                />
      </div>
    )
  }

}

Chart.propTypes = {
  data: PropTypes.array.isRequired,
  height: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired
}

Chart.defaultProps = {
  data: [],
  height: 100,
  width: 4096
}

export default Chart
