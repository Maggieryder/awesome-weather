import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Row } from 'react-bootstrap';
import $ from 'jquery'
import { getTouchCoords } from '../utils/coords.js'

import Chart from 'chart'
import Hour from 'hour'


class Charts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      svgWidth:0,
      svgHeight:0
    }
    this.onUpdate = this.props.onUpdate
  }

    onTouchStart (evt) {
      //console.log('TOUCHED DOWN')
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

    onTouchMove (evt) {
      if(this.touching){
        let x = getTouchCoords(evt, this.offset).x
        //console.log('TOUCH MOVING INDEX', Math.floor(x / this.columnwidth))
        this.onUpdate(Math.floor(x / this.columnwidth))
      } else {
        //console.log('TOUCH MOVING', this.state.isTouching)
      }
    }

    onTouchEnd (evt){
      this.touching = false;
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
    window.addEventListener('resize', that.updateDimensions)
  }
  componentWillUnmount() {
    let that = this
    //$( window ).off('resize', this.updateDimensions)
    window.removeEventListener('resize', that.updateDimensions)
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

    let {hourly, response, isLoading} = this.props.weather //unit,
    let {chart, numHrs} = this.props
    let validData = !isLoading && !response.error && !response.results
    //console.log('RENDER CHART', chart)
    //console.log('CHART response',response)
    let defaultHrs = [{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}] // hack attack!!
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
            onTouchEnd={this.onTouchEnd.bind(this)}>
          { validData ? this.renderChart(data[chart].slice(0,numHrs)) : null }
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
