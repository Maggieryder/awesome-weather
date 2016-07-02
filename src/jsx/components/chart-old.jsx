import React, { PropTypes } from 'react'
//import { Sparklines, SparklinesCurve /*, SparklinesSpots, SparklinesBars/*, SparklinesReferenceLine*/ } from 'react-sparklines'
import Chartist from 'chartist'
import ChartistGraph from 'chartist-line'

import 'css!sass!chartist/dist/scss/chartist.scss';

const Chart = (props) => {
  let { width, height } = props;
  //console.log(props.data)
  let datatosort = props.data.slice()
  let sorteddata = datatosort.sort(function(a, b){return a - b});
  console.log(sorteddata)
  let data = {
    //labels: ['temps', 'winds', 'precips'],
    labels: Chartist.times(96),
    series: [props.data]
  }
/*
  let data = {
    //labels: ['temps', 'winds', 'precips'],
    labels: Chartist.times(96),
    series: [/*{
      name: 'temps',
      data: props.data['temps'].slice(0,96)
    }, {
      name: 'precips',
      data: props.data['precips'].slice(0,96)
    }, {
      name: 'winds',
      data: props.data['winds'].slice(0,96)
    }]

  }*/

  let options = {

    width: width,
    height: height,
    low: sorteddata[0],
    high: sorteddata[sorteddata.length-1],
    showArea: true,
    //showPoint:true,

    fullWidth: true,
    axisX: {
      offset: -4,
      showGrid: true,
      showLabel: false
    },
    axisY: {
      offset: 20,
      showGrid: false,
      showLabel: true
    },
    lineSmooth: Chartist.Interpolation.simple({
      divisor: 5
    })/*,

    series: {
      'temps': {
        low: 0,
        high: 100,
        showArea: true
      },
      'precips':{
        //lineSmooth: Chartist.Interpolation.step(),
        low: 0,
        high: 100,
        showArea: true
      },
      'winds':{
        low: 0,
        high: 10,
        showPoint: false
      }
    }*/
  }

  let chartStyle = {
    stroke: props.color,
    strokeWidth: props.stroke,
    fill: props.fill,
    fillOpacity: props.opacity
  }

  let getScrollLeftOffset = function(element) {
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

    let onTouchStart = function(evt) {
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

    let onTouchMove = function(evt) {
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

    let onTouchEnd = function(evt)  {
      this.touching = false;
    }

    let onDraw = function(data, color)  {
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

  return (
    <div>
      <ChartistGraph className={'ct-hours'} data={data} options={options} type='Line' />
    </div>
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

/*
<Sparklines height={props.height} width={props.width} data={props.data} preserveAspectRatio='none' >
  <SparklinesCurve style={chartStyle}/>
</Sparklines>


<SparklinesReferenceLine type="avg" />
<SparklinesSpots size={4}
  style={{ stroke: "red", strokeWidth: 3, fill: "white" }} />*/
