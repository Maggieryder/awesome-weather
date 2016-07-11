import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Row } from 'react-bootstrap';
import { getTouchCoords } from '../utils/coords.js'

import Chart from 'chart'
import Hour from 'hour'

let APIParams = (hour, type) => {
  switch (type){
    case 'temps':
    return parseInt(hour.temp.english)
    case 'feels' :
    return parseInt(hour.feelslike.english)
    case 'winds':
    return parseInt(hour.wspd.metric)
    case 'precips' :
    return parseInt(hour.pop)
    case 'skies':
    return parseInt(hour.sky)
    case 'humidities' :
    return parseInt(hour.humidity)
    case 'pressures':
    return parseInt(hour.mslp.metric)
    case 'dewpoints' :
    return parseInt(parseInt(hour.dewpoint.english))
    case 'uvis' :
    return parseInt(parseInt(hour.uvi))
    default:
    return null
  }
}


class Charts extends Component {
  constructor(props) {
    super(props);
    this.onUpdate = this.props.onUpdate.bind(this)
    this.listenersAdded = false
  }

  addListeners(){
    if (!this.listenersAdded){
      let chart = document.getElementById('chart')
      chart.addEventListener('mousedown', this.onTouchStart, false)
      chart.addEventListener('mousemove', this.onTouchMove, false)
      chart.addEventListener('mouseup', this.onTouchEnd, false)
      chart.addEventListener('mouseleave', this.onTouchEnd, false)
      chart.addEventListener('touchstart', this.onTouchStart, false)
      chart.addEventListener('touchmove', this.onTouchMove, false)
      chart.addEventListener('touchend', this.onTouchEnd, false)
      chart.addEventListener('touchcancel', this.onTouchEnd, false)
      this.listenersAdded = true
      //console.log('CHARTS ADD listeners', chart)
    }
  }

  removeListeners(){
    if (this.listenersAdded){
      let chart = document.getElementById('chart')
      chart.removeEventListener('mousedown', this.onTouchStart, false)
      chart.removeEventListener('mousemove', this.onTouchMove, false)
      chart.removeEventListener('mouseup', this.onTouchEnd, false)
      chart.removeEventListener('mouseleave', this.onTouchEnd, false)
      chart.removeEventListener('touchstart', this.onTouchStart, false)
      chart.removeEventListener('touchmove', this.onTouchMove, false)
      chart.removeEventListener('touchend', this.onTouchEnd, false)
      chart.removeEventListener('touchcancel', this.onTouchEnd, false)
      this.listenersAdded = false
      console.log('CHARTS REMOVE listeners', chart)
    }
  }

  componentDidMount() {
    // add listeners
    this.addListeners()
  }
  componentWillUnmount() {
    // remove listeners
    this.removeListeners()
  }

  componentWillUpdate(nextProps) {
    //console.log('CHARTS will update same chart', nextProps.chart === this.props.chart)
    if (nextProps.chart !== this.props.chart) {
      //this.removeListeners()
    }
  }

  componentDidUpdate(prevProps) {
    //console.log('CHARTS did update same chart', prevProps.chart === this.props.chart )
    if (prevProps.chart !== this.props.chart) {
      //this.addListeners()
    }
  }

  componentWillReceiveProps(nextProps){
    //
  }

  onTouchStart = (evt) => {
    //console.log('TOUCHED DOWN',this.props)
    evt.preventDefault();
    this.is_touch = (evt.changedTouches);
    let { transform, numHrs } = this.props
    let node = evt.currentTarget;
    this.columnwidth = node.offsetWidth/numHrs
    //console.log('>>>>>>> CHART width >>>>>> CHART height',node.offsetWidth, node.offsetHeight); //widths

    //let grid = node.querySelector('.ct-grids');
    //let bbox = grid.getBBox();
    //console.log(bbox) //only shows up if axisX:showGrid is set to true in chart.jsx

    this.offset = {x:transform,y:0}
    //console.log('this.offset', this.offset )
    this.touching = true;
    this.onTouchMove(evt);
  }

  onTouchMove = (evt) => {
    evt.preventDefault();
    if(this.touching){
      let x = getTouchCoords(evt, this.offset).x
      //console.log('TOUCH MOVING INDEX', Math.floor(x / this.columnwidth))
      this.onUpdate(Math.floor(x / this.columnwidth))
    } else {
      //console.log('TOUCH MOVING', this.state.isTouching)
    }
  }

  onTouchEnd = (evt) => {
    evt.preventDefault();
    this.touching = false;
    //console.log('TOUCH ENDED', this.touching)
  }

  renderChart (data) {
    return (
      <Chart data={data}/>
    )
  }

  renderHour = (hr, id) => {
    let { numHrs, hrIndex } = this.props
    let { isLoading } = this.props.weather
    //console.log('hrIndex ...', hrIndex)
    if (id < numHrs){
      return <Hour key={id} id={id} hr={hr} hrIndex={hrIndex} isLoading={isLoading} />
    }
  }

  render() {

    let {hourly, response, isLoading} = this.props.weather
    let {chart, numHrs} = this.props
    let validData = !isLoading && !response.error && !response.results
    //console.log('RENDER CHART', chart)

    let defaultHrs = [{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}] // hack attack!!
    let rowStyle = {margin:0, overflow:'hidden'}
    let hours, data
    if( validData ){
      hours = hourly.map(hour => hour.FCTTIME)
      data = hourly.map(hour => APIParams(hour,chart))
    }

    return (
      <Row style={rowStyle}>
        <div id='chart' className='chart'>
          { validData ? this.renderChart(data.slice(0,numHrs)) : null }
          <ul className="hours">
            { validData ? hours.slice(0,numHrs).map(this.renderHour) : defaultHrs.map(this.renderHour)}
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
  transform: PropTypes.number
}
Charts.defaultProps = {
  numHrs: 96,
  hrIndex: 0,
  chart: 'temps',
  weather: {},
  transform: 0
}

function mapStateToProps({weather}){
  return { weather }
}

export default connect(mapStateToProps)(Charts)

/*
//let curTransform = new WebKitCSSMatrix(window.getComputedStyle(node).webkitTransform);
//let curTransform = new MSCSSMatrix(window.getComputedStyle(node).webkitTransform);
// curTransform.m41 is the transformed x
//console.log('INDEX', Math.abs(Math.floor((curTransform.m41)/this.columnwidth)))
*/
