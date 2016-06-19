import React, {Component} from 'react'
import { connect } from 'react-redux'
import { Row } from 'react-bootstrap';
import $ from '../../vendor/jquery_1.12.0.min.js'

import Chart from './chart'

class Charts extends Component {
  constructor(props) {
    super(props);
    this.state = {svgWidth:0, svgHeight:0}
  }
  handleChartHover(id, day) {
    this.props.onMouseOver(id, day)
  }
  renderChart (data) {
    return (
      <Chart data={data} color="rgba(255,255,255,.6)" width={this.state.svgWidth} height={this.state.svgHeight}/>
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
    let { response, isLoading } = this.props.weather
      if (id < numHrs){
        return <li
                  key={id}
                  className={ parseInt(hr.hour)%6===0 ? 'marker' : null }
                  onMouseOver={this.props.onMouseOver.bind(this,id)} >
                    <div className={ parseInt(hr.hour)%6===0 ? 'no-marker' : null }>{!isLoading ? hr.hour==='0' ? 'A' : hr.hour==='12' ? 'P' : '' : '' }</div>
                    <div className={`indicator${id===hrIndex ? ' on' : ''}`} ></div>
                </li>
      }
  }

  render() {

    let {hourly, response, isLoading} = this.props.weather
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
        temps: hourly.map(hour => hour.temp.english),
        feels: hourly.map(hour => hour.feelslike.english),
        winds: hourly.map(hour => hour.wspd.metric),
        precips: hourly.map(hour => hour.pop),
        skies: hourly.map(hour => hour.sky),
        humidities: hourly.map(hour => hour.humidity)
      }
    }

    return (
      <Row style={rowStyle}>
        <div className="chart" style={{height:this.state.svgHeight}}>
          { validData ? this.renderChart(data[chart].slice(0,numHrs)) : null }
          <ul className="hours">
            { validData ? hours.map(this.renderHour) : defaultHrs.map(this.renderHour)}
          </ul>
        </div>
      </Row>
    )
  }
}

function mapStateToProps({weather}){
  return { weather }
}

export default connect(mapStateToProps)(Charts)
