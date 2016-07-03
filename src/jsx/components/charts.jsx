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
      transformX:0
    }
    this.onUpdate = this.props.onUpdate
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
      let { transform } = this.props
      //let node = evt.currentTarget.previousSibling;
      let node = evt.currentTarget;
      //console.log(node, coords(node));


      //let chrt = node.querySelector('.ct-chart');
      //let grid = node.querySelector('.ct-grids');
      //console.log(this.getTransformOffsetX(node))
      //let curTransform = new WebKitCSSMatrix(window.getComputedStyle(node).webkitTransform);
      //let curTransform = new MSCSSMatrix(window.getComputedStyle(node).webkitTransform);
      // curTransform.m41 is the transformed x
      this.columnwidth = node.offsetWidth/96
      //console.log('>>>>>>> CHART width >>>>>> COL WIDTH',node.offsetWidth, this.columnwidth); //widths
      //console.log('translated X', curTransform.m41); //real offset left
      //console.log('INDEX - curTransform.m41)/this.columnwidth', Math.abs(Math.floor((curTransform.m41)/this.columnwidth)))

      //let bbox = grid.getBBox();
      //console.log(bbox)
      //this.columnwidth = bbox.width / 96;

      //this.offset = this.getScrollLeftOffset(node) + bbox.x + (this.columnwidth / 2);
      this.offset = transform
      console.log('this.offset', this.offset, )
      //console.log('are these the same?',this.getScrollLeftOffset(node), coords(node))
      this.touching = true;
      this.onTouchMove(evt);
    }

    onTouchMove (evt) {
      if(this.touching){
        let x;
        if (this.is_touch) {
          if(evt.touches && evt.touches[0]){
            x = evt.touches[0].clientX - this.offset;
          }
        } else {
          x = evt.clientX - this.offset;
        }
        /*this.setState({
          index: Math.round(x / this.columnwidth)
        });*/
        //console.log('x', x)
        console.log('TOUCH MOVING INDEX', Math.floor(x / this.columnwidth))
        this.onUpdate(Math.floor(x / this.columnwidth))
      }
    }

    onTouchEnd (evt){
      console.log('TOUCH ENDED')
      this.touching = false;
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
        return <li
                  key={id}
                  className={ parseInt(hr.hour)%6===0 ? 'marker' : null }
                   >
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
            onMouseUp={this.onTouchEnd.bind(this)}
            onTouchEnd={this.onTouchEnd.bind(this)}>
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
  transform:PropTypes.number
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

/*onMouseOver={this.onUpdate.bind(this,id)}*/
