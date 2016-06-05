import React, {Component} from 'react'
import { connect } from 'react-redux'

import Chart from './chart'

class Charts extends Component {
  constructor(props) {
    super(props);
    this.state = {svgWidth:0, svgHeight:0}
  }
  handleChartHover(id, day) {
    this.props.onMouseOver(id, day)
  }
  renderChart (data, width, height) {
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
    window.addEventListener("resize", that.updateDimensions);
  }
  componentWillUnmount() {
    let that = this
    //$( window ).off('resize', this.updateDimensions)
    window.removeEventListener("resize", that.updateDimensions);
  }
  renderHour = (hr, id) => {
      if (id < this.props.numHrs){
        return <li
                  key={id}
                  className={parseInt(hr.hour)%6===0 ? "marker" : null}
                  onMouseOver={this.props.onMouseOver.bind(this,id)} >
                    <div>{hr.hour==='0' ? 'A' : hr.hour==='12' ? 'P' : ''}</div>
                </li>
      }
  }
  render() {
    let {hourly} = this.props.weather
    let {chart, numHrs} = this.props
    console.log('RENDER CHART', chart)
    let hours = hourly.map(hour => hour.FCTTIME),
    temps = hourly.map(hour => hour.temp.english),
    feellikes = hourly.map(hour => hour.feelslike.english),
    winds = hourly.map(hour => hour.wspd.metric),
    precips = hourly.map(hour => hour.pop),
    skies = hourly.map(hour => hour.sky),
    humidities = hourly.map(hour => hour.humidity)

    return (
      <div className="row" style={{margin:0, width:'100%',overflow:'hidden'}}>
        <div className="chart" style={{height:this.state.svgHeight}}>
          {chart === 'temps' ? this.renderChart(temps.slice(0,numHrs)) : null}
          {chart === 'feels' ? this.renderChart(feellikes.slice(0,numHrs)) : null}
          {chart === 'winds' ? this.renderChart(winds.slice(0,numHrs)) : null}
          {chart === 'precips' ? this.renderChart(precips.slice(0,numHrs)) : null}
          {chart === 'skies' ? this.renderChart(skies.slice(0,numHrs)) : null}
          {chart === 'humidities' ? this.renderChart(humidities.slice(0,numHrs)) : null}
          <ul className="hours">
            {hours.map(this.renderHour)}
          </ul>
        </div>
      </div>
    )
  }
}

function mapStateToProps({weather}){
  return { weather }
}

export default connect(mapStateToProps)(Charts)
