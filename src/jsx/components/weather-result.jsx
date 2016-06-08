import React, {Component} from 'react'
import { connect } from 'react-redux'
import Bootstrap, { Row, Col, Glyphicon } from 'react-bootstrap';
import { toggleUnit, toggleFavorite, toggleModal } from '../../actions/index'
import ToggleBtn from './toggle-btn'
//import ModalInstance from './modal'

import DayForecast from './forecast-days'
import Charts from './charts'
import Meters from './meters'

import WeatherIcon from '../../icons/weather-icon.jsx'

class WeatherResult extends Component {
  constructor(props) {
    super(props);
    console.log('RESULT PROPS >>', this.props)
    this.state = {
      hrIndex: 0,
      dayIndex: 0,
      chart: 'temps',
      svgWidth:200,
      svgHeight:150
    }
  }

  updateDimensions = () => {
    this.setState({
      svgWidth: $(window).width()>=768 ? 400 : $(window).width()>=414 ? 280 : $(window).width()>=375 ? 200 : 160,
      svgHeight: $(window).width()>=768 ? 300 : $(window).width()>=414 ? 210 : $(window).width()>=375 ? 150 : 120
    });
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

  componentWillReceiveProps(props){
    let { response, isLoading } = props.weather
    //console.log('componentWillReceiveProps', response)
    if(!isLoading && response.error){
        console.log('ERROR', response)
        this.props.toggleModal({title:'YIKES!',body:response.error.description})
    }
  }

  renderWindStr (spd/*, gust*/) {
    let str
    switch (spd){
      case 'Calm':
      //case 'Variable':
      str = spd.toLowerCase()
      break
      default:
      //str = gust > spd ? spd +' - '+gust : spd
      str = spd
    }
    return str
  }

  handleChartHover = (id) => {
    //console.log('handleChartHover', id)
    let { hourly } = this.props.weather,
    hrs = hourly.map(hour => hour.FCTTIME),
    midnitehours = this.midniteHrs(hrs);
    //console.log('midnitehours', midnitehours)
    let dayIndex = 0
    for (let i=0; i < midnitehours.length; i++){
      //console.log('midnitehours[i].id', midnitehours[i].id)
      if (midnitehours[i].id > parseInt(id)){
        dayIndex = i;
        break;
      }
    }
    //console.log('dayIndex', dayIndex)
    this.setState({
      hrIndex:id,
      dayIndex:dayIndex
    })
  }

  midniteHrs(hrs){
    let arr = []
    hrs.map((hr, id) => {
      if (hr.hour === '0') {
        arr.push({id:id})
      }
    })
    return arr
  }

  handleDayClick = (id) => {
    console.log('handleDayClick', id)
    this.setState({
      //hrIndex:id,
      dayIndex:id
    })
  }

  afterdark(sp, now){
    let hr = parseInt(now),
    sunrise = parseInt(sp.sunrise.minute)<30 ? parseInt(sp.sunrise.hour) : parseInt(sp.sunrise.hour)+1,
    sunset = parseInt(sp.sunset.minute)<30 ? parseInt(sp.sunset.hour) : parseInt(sp.sunset.hour)+1
    //console.log(hr, sunrise, sunset )
    return ((hr > sunrise ) && (hr < sunset)) ? false : true
  }

  toggleFavorite(val){
    this.props.toggleFavorite(this.props.weather.location, val)
  }

  toggleUnit(val){
    this.props.toggleUnit(val)
  }

  render() {

    let {hrIndex, svgWidth, svgHeight} = this.state
    let {response, hourly, location, sunphase, unit, isLoading } = this.props.weather
    let dates, conditions, icons, isDark
    if (!isLoading && !response.error) {
      dates = hourly.map(hour => hour.FCTTIME),
      conditions = hourly.map(hour => hour.wx),
      icons = hourly.map(hour => hour.icon),
      isDark = !isLoading ? this.afterdark(sunphase, dates[hrIndex].hour) : false
      //console.log('isDark',isDark)
    }

    const rowStyle = {margin:'8px 4px 0 4px'}

    const noMargin = {margin:'0px'}
    const noPadding = {padding:'0px'}

    const favoriteOptions = [
      <Glyphicon glyph="heart-empty" />,
      <Glyphicon glyph="heart" />
    ]

    const unitOptions = [
      <span>&deg;C</span>,
      <span>&deg;F</span>
    ]

    return (
      <div>

        <Row style={noMargin}>
          <Col xs={12} sm={6} style={noPadding}>
            <Row style={{margin:'6px 8px 0 4px'}}>
              <Col xs={2} style={{padding:'0 0 0 4px'}}>
                <ToggleBtn toggleFunction={this.toggleUnit.bind(this)} options={unitOptions} styleClass="pull-left" />
              </Col>
              <Col xs={8} style={{padding:'0 0 0 4px'}}>
                <div className="time">{!isLoading && !response.error ? <h2>{dates[hrIndex].weekday_name}, {dates[hrIndex].civil}</h2> : null}</div>
              </Col>
              <Col xs={2} style={{padding:'0 0 0 4px'}}>
                <ToggleBtn toggleFunction={this.toggleFavorite.bind(this)} options={favoriteOptions} styleClass="pull-right no-boundary"/>
              </Col>
            </Row>

            {!isLoading ?
              <Row style={noMargin}>
                <Col xs={12} style={noPadding}>
                  <p>{!response.error ? dates[hrIndex].month_name+' '+dates[hrIndex].mday+', '+dates[hrIndex].year : '' }</p>
                </Col>
                <Col xs={12} style={noPadding}>
                  {!response.error ? <div style={{width:svgWidth+'px', height:svgHeight+'px', margin: '-5px auto'}}>
                    <WeatherIcon stroke="2" opacity={1} desc={icons[hrIndex]} isDark={isDark}/>
                  </div> : null }
                  <h2>{!response.error ? conditions[hrIndex] : null }</h2>
                </Col>
              </Row> :
              <Row style={noMargin}>
                <Col xs={12} style={{height:'200px', paddingTop:'100px'}}>LOADING...</Col>
              </Row>}
          </Col>
        </Row>

        <div className="footer">
          <Meters hrIndex={hrIndex} onSelect={(type)=>{this.setState({chart:type})}}/>
          <Charts chart={this.state.chart} onMouseOver={this.handleChartHover} numHrs={96}/>
          <DayForecast numDays={4} onSelect={this.handleDayClick} dayIndex={this.state.dayIndex}/>
        </div>
      </div>
    )
  }
}

function mapStateToProps({ weather }){
  return { weather }
}

export default connect(mapStateToProps, { toggleUnit, toggleFavorite, toggleModal })(WeatherResult)
