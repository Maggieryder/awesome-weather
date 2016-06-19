import React, {Component} from 'react'
import { connect } from 'react-redux'
import { Row, Col, Glyphicon } from 'react-bootstrap';
import $ from '../../vendor/jquery_1.12.0.min.js'
import _ from 'lodash'
import { getWeather, loading, toggleUnit, toggleFavorite, toggleModal } from '../../actions/index'
import ToggleBtn from './toggle-btn'
//import ModalInstance from './modal'
import MultipleChoices from './multiple-choice-list';
import DayForecast from './forecast-days'
import Charts from './charts'
import Meters from './meters'
import coords from '../utils/coords.js'

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
    window.addEventListener('resize', that.updateDimensions);
  }
  componentWillUnmount() {
    let that = this
    //$( window ).off('resize', this.updateDimensions)
    window.removeEventListener('resize', that.updateDimensions);
  }

  componentWillReceiveProps(props){
    let { response, isLoading } = props.weather
    console.log('componentWillReceiveProps', props)
    if(!isLoading && response.error){
        console.log('ERROR', response)
        this.props.toggleModal({title:'YIKES!',body:response.error.description})
    }
    if(!isLoading && response.results){
      console.log('MULTIPLE CHOICES', response.results)
      this.props.toggleModal({title:'PICK ONE!',body:<MultipleChoices className="choices" items={response.results} onSelect={this.handleChoiceSelect} />})
    }
  }

  handleChoiceSelect = (query) => {
    this.props.toggleModal(null)
    console.log('QID', query);
    this.getLocation(query);
  }

  getLocation = (query) => {
    this.props.loading(true)
    this.props.getWeather(query)
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
    let chart = document.querySelectorAll('.chart')[0]
    let { hourly } = this.props.weather,
    hrs = hourly.map(hour => hour.FCTTIME)
    let midnitehours = this.midniteHrs(hrs);
    let startHr
    if (id===0){
      chart.style.WebkitTransform = 'translate3d(0, 0, 0)'
      startHr = 0
    } else {
      //console.log('midnitehours[id-1].id', midnitehours[id-1].id)
      let $markers = $('.hours li')
      let pos = coords($markers[midnitehours[id-1].id])
      //console.log('coords', pos)
      chart.style.WebkitTransform = 'translate3d('+pos.x*-1+'px, 0, 0)'
      chart.style.MozTransform = 'translate3d('+pos.x*-1+'px, 0, 0)'
      startHr = parseInt(midnitehours[id-1].id) + 12 //midday
    }

    this.setState({
      hrIndex: startHr,
      dayIndex: id
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
    this.props.toggleFavorite(this.props.weather.location)
  }

  toggleUnit(val){
    this.props.toggleUnit(val)
  }

  render() {

    let { hrIndex, svgWidth, svgHeight } = this.state
    let { response, unit, hourly, sunphase, isLoading, location } = this.props.weather  //unit
    let { favorites } = this.props.favorites
    let validData = !isLoading && !response.error && !response.results
    //console.log('validData', validData)

    let dates, conditions, icons, isDark, isFavorite, isMetric
    if (validData) {
      let idx = _.findIndex(favorites, function(i) { return i.l === location.l })
      isFavorite = idx !== -1 ? 1 : 0
      isMetric = unit==='metric' ? 0 : 1
      //console.log('isFavorite / idx', isFavorite, idx)
      dates = hourly.map(hour => hour.FCTTIME),
      conditions = hourly.map(hour => hour.wx),
      icons = hourly.map(hour => hour.icon),
      isDark = !isLoading ? this.afterdark(sunphase, dates[hrIndex].hour) : false
      //console.log('isDark',isDark)
    }

    //const rowStyle = {margin:'8px 4px 0 4px'}

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
                <ToggleBtn toggleFunction={this.toggleUnit.bind(this)} options={unitOptions} state={isMetric} styleClass="unit pull-left" />
              </Col>
              <Col xs={8} style={{padding:'0 0 0 4px'}}>
                <div className="time">{validData ? <h2>{dates[hrIndex].weekday_name}, {dates[hrIndex].civil}</h2> : null}</div>
              </Col>
              <Col xs={2} style={{padding:'0 0 0 4px'}}>
                <ToggleBtn toggleFunction={this.toggleFavorite.bind(this)} options={favoriteOptions} state={isFavorite} styleClass="pull-right no-boundary"/>
              </Col>
            </Row>

            {!isLoading ?
              <Row style={noMargin}>
                <Col xs={12} style={noPadding}>
                  <p>{validData ? dates[hrIndex].month_name+' '+dates[hrIndex].mday+', '+dates[hrIndex].year : '' }</p>
                </Col>
                <Col xs={12} style={noPadding}>
                  {validData ? <div style={{width:svgWidth+'px', height:svgHeight+'px', margin: '-5px auto'}}>
                    <WeatherIcon stroke="2" opacity={1} desc={icons[hrIndex]} isDark={isDark}/>
                  </div> : null }
                  <h2>{validData ? conditions[hrIndex] : null }</h2>
                </Col>
              </Row> :
              <Row style={noMargin}>
                <Col xs={12} style={{height:'200px', paddingTop:'100px'}}>LOADING...</Col>
              </Row>}
          </Col>
        </Row>

        <div className="footer">
          <Meters hrIndex={hrIndex} onSelect={(type)=>{this.setState({chart:type})}}/>
          <Charts chart={this.state.chart} hrIndex={hrIndex} onMouseOver={this.handleChartHover} numHrs={96}/>
          <DayForecast numDays={4} onSelect={this.handleDayClick} dayIndex={this.state.dayIndex}/>
        </div>
      </div>
    )
  }
}

function mapStateToProps({ weather, favorites }){
  return { weather, favorites }
}

export default connect(mapStateToProps, { getWeather, loading, toggleUnit, toggleFavorite, toggleModal })(WeatherResult)
