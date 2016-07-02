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

  getScrollLeftOffset (element) {
    let offset = element.offsetLeft;
    let offsetParent = element.offsetParent;
    while (element.parentNode) {
      element = element.parentNode;
      if (element.scrollLeft) {
        offset -= element.scrollLeft;
      }
      if (offsetParent && element === offsetParent) {
        offset += element.offsetLeft;
        offsetParent = element.offsetParent;
      }
    }
    return offset;
  }

  onTouchStart (evt) {
    console.log('TOUCHED DOWN')
    evt.preventDefault();
    this.is_touch = (evt.touches);
    let node = evt.currentTarget.previousSibling;
    let grid = node.querySelector('.ct-grids');
    let bbox = grid.getBBox();
    this.columnwidth = bbox.width / this.props.data.length;
    this.offset = this.getScrollLeftOffset(node) + bbox.x + (this.columnwidth / 2);
    this.touching = true;
    this.onTouchMove(evt);
  }

  onTouchMove (evt) {
    console.log('TOUCH MOVING')
    if(this.touching){
      let x;
      if (this.is_touch) {
        if(evt.touches && evt.touches[0]){
          x = evt.touches[0].clientX - this.offset;
        }
      } else {
        x = evt.clientX - this.offset;
      }
      this.setState({
        index: Math.round(x / this.columnwidth)
      });
    }
  }

  onTouchEnd (evt){
    console.log('TOUCH ENDED')
    this.touching = false;
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
                onMouseDown={this.onTouchStart}
                onTouchStart={this.onTouchStart}
                onMouseMove={this.onTouchMove}
                onTouchMove={this.onTouchMove}
                onMouseUp={this.onTouchEnd}
                onTouchEnd={this.onTouchEnd}/>
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
