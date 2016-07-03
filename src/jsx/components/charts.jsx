import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Row } from 'react-bootstrap';
import $ from 'jquery'
import coords from '../utils/coords.js'

import Chart from 'chart'


class Charts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      svgWidth:0,
      svgHeight:0,
      isTouching: false,
    }
    this.onUpdate = this.props.onUpdate
  }

  componentDidMount() {
    let that = this
    //document.addEventListener(that.is_touch ? 'touchmove' : 'mousemove', that.onTouchMove, true);
    document.addEventListener(that.is_touch ? 'touchend' : 'mouseup', that.onTouchEnd, false);
  }
  componentWillUnmount() {
    let that = this
    //document.removeEventListener(that.is_touch ? 'touchmove' : 'mousemove', that.onTouchMove, true);
    document.removeEventListener(that.is_touch ? 'touchend' : 'mouseup', that.onTouchEnd, false);
  }
/*
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
    }*/

    onTouchStart (evt) {
      console.log('TOUCHED DOWN')
      evt.preventDefault();
      this.is_touch = (evt.touches);
      let { transform, numHrs } = this.props
      let node = evt.currentTarget;
      //console.log(node, coords(node));
      //let grid = node.querySelector('.ct-grids');
      //let curTransform = new WebKitCSSMatrix(window.getComputedStyle(node).webkitTransform);
      //let curTransform = new MSCSSMatrix(window.getComputedStyle(node).webkitTransform);
      // curTransform.m41 is the transformed x
      this.columnwidth = node.offsetWidth/numHrs
      //console.log('>>>>>>> CHART width >>>>>> COL WIDTH',node.offsetWidth, this.columnwidth); //widths
      //console.log('translated X', curTransform.m41); //real offset left
      //console.log('INDEX - curTransform.m41)/this.columnwidth', Math.abs(Math.floor((curTransform.m41)/this.columnwidth)))

      //let bbox = grid.getBBox();
      //console.log(bbox)
      //this.offset = this.getScrollLeftOffset(node) + bbox.x + (this.columnwidth / 2);

      this.offset = transform
      console.log('this.offset', this.offset, )
      this.touching = true;
      this.setState({isTouching: true})
      //this.onTouchMove(evt);
    }

    onTouchMove (evt) {
      if(this.state.isTouching){
        let x;
        if (this.is_touch) {
          if(evt.touches && evt.touches[0]){
            x = evt.touches[0].clientX - this.offset;
          }
        } else {
          x = evt.clientX - this.offset;
        }
        //console.log('x', x)
        console.log('TOUCH MOVING INDEX', Math.floor(x / this.columnwidth))
        this.onUpdate(Math.floor(x / this.columnwidth))
      } else {
        console.log('TOUCH MOVING', this.state.isTouching)
      }
    }

    onTouchEnd (evt){
      //document.removeEventListener(this.is_touch ? 'touchend' : 'mouseup', this.onTouchEnd, false);
      this.touching = false;
      this.setState({isTouching: false})
      //console.log('TOUCH ENDED', this.touching)
    }

  renderChart (data) {
    return (
      <Chart data={data} width={this.state.svgWidth} height={this.state.svgHeight}/>
    )
  }
  updateDimensions = () => {
      this.setState({svgWidth: $(window).width()*4, svgHeight: $(window).width()>500 ? 100 : $(window).width()>=375 ? 85 : 50});
  }
  componentWillMount() {
      this.updateDimensions();
  }
  componentDidMount() {
    let that = this
    //$( window ).resize(this.updateDimensions}
    window.addEventListener('resize', that.updateDimensions);
  }
  componentWillUnmount() {
    let that = this
    //$( window ).off('resize', this.updateDimensions)
    window.removeEventListener('resize', that.updateDimensions);
  }

  renderHour = (hr, id) => {
    let { numHrs, hrIndex } = this.props
    //console.log('hrIndex ...', hrIndex)
    //<div className={ parseInt(hr.hour)%6===0 ? 'no-marker' : null }>{!isLoading ? hr.hour==='0' ? 'A' : hr.hour==='12' ? 'P' : '' : '' }</div>
    let { isLoading } = this.props.weather
      if (id < numHrs){
        return <li key={id} className={ parseInt(hr.hour)%6===0 ? 'marker' : null }>
                    <div className={ parseInt(hr.hour)%6===0 ? 'no-marker' : null }>{!isLoading ? hr.hour : '' }</div>
                    <div className={`indicator${id===hrIndex ? ' on' : ''}`} ></div>
                </li>
      }
  }

  render() {

    let {hourly, response, unit, isLoading} = this.props.weather
    let {chart, numHrs} = this.props
    let validData = !isLoading && !response.error && !response.results
    //console.log('RENDER CHART', chart)
    //console.log('CHART response',response)
    let defaultHrs = ['','','','','','','','','','','','','','','','','','','','','','','',''] // hack attack!!
    let rowStyle = {margin:0, overflow:'hidden'}
    let hours, data
    if( validData ){
      hours = hourly.map(hour => hour.FCTTIME)
      data = {
        temps: hourly.map(hour => parseInt(hour.temp.english)),
        feels: hourly.map(hour => parseInt(hour.feelslike.english)),
        winds: hourly.map(hour => parseInt(hour.wspd.metric)),
        precips: hourly.map(hour => parseInt(hour.pop)),
        skies: hourly.map(hour => parseInt(hour.sky)),
        humidities: hourly.map(hour => parseInt(hour.humidity)),
        pressures: hourly.map(hour => parseInt(hour.mslp.metric)),
        dewpoints: hourly.map(hour => parseInt(hour.dewpoint.english)),
        uvis: hourly.map(hour => parseInt(hour.uvi))
      }
    }

    return (
      <Row style={rowStyle}>
        <div className="chart" style={{height:this.state.svgHeight}}
            onMouseDown={this.onTouchStart.bind(this)}
            onTouchStart={this.onTouchStart.bind(this)}
            onMouseMove={this.onTouchMove.bind(this)}
            onTouchMove={this.onTouchMove.bind(this)}
            onMouseLeave={this.onTouchEnd.bind(this)}
            onTouchCancel={this.onTouchEnd.bind(this)}
            onMouseUp={this.onTouchEnd.bind(this)}
            onTouchEnd={this.onTouchEnd.bind(this)}
            >
          { validData ? this.renderChart(data[chart].slice(0,96)) : null }
          <ul className="hours">
            { validData ? hours.map(this.renderHour) : defaultHrs.map(this.renderHour)}
          </ul>
        </div>
      </Row>
    )
  }
}

Charts.propTypes = {
  numHrs: PropTypes.number,
  hrIndex: PropTypes.number.isRequired,
  chart: PropTypes.string.isRequired,
  onUpdate: PropTypes.func.isRequired,
  weather: PropTypes.object.isRequired,
  isTouching: PropTypes.bool,
  transform: PropTypes.number
}
Charts.defaultProps = {
  numHrs: 96,
  hrIndex: 0,
  chart: 'temps',
  weather: {},
  isTouching: false,
  transform: 0
}

function mapStateToProps({weather}){
  return { weather }
}

export default connect(mapStateToProps)(Charts)

/*
onMouseMove={this.onTouchMove.bind(this)}
onTouchMove={this.onTouchMove.bind(this)}
onMouseUp={this.onTouchEnd.bind(this)}
onTouchEnd={this.onTouchEnd.bind(this)}
*/
