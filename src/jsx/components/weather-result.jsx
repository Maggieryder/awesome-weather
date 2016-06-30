import React, { Component, PropTypes} from 'react'
import { connect } from 'react-redux'
import { Row, Col, Glyphicon } from 'react-bootstrap';
import $ from 'jquery'
import _ from 'lodash'
import { getWeather, loading, toggleUnit, toggleFavorite, toggleModal } from '../../actions/index'
import ToggleBtn from 'ToggleBtn'
//import ModalInstance from 'Modal'
import MultipleChoices from 'ChoiceList';
import DayForecast from 'Days'
import Charts from 'Charts'
import Meters from 'Meters'
import coords from '../utils/coords.js'

import WeatherIcon from 'WeatherIcon'

class WeatherResult extends Component {
  constructor(props) {
    super(props);
    //console.log('RESULT PROPS >>', this.props)
    this.state = {
      hrIndex: 0,
      dayIndex: 0,
      chart: 'temps',
      svgWidth:200,
      svgHeight:150
    }
    this.toggleModal = this.props.toggleModal
    this.toggleUnit = this.props.toggleUnit
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
    //console.log('componentWillReceiveProps', props)
    if(!isLoading && response.error){
        //console.log('ERROR', response.error.description)
        this.toggleModal({body:response.error.description})
    }
    if(!isLoading && response.results){
      //console.log('MULTIPLE CHOICES', response.results)
      this.toggleModal({title:'WHICH ONE?',body:<MultipleChoices className="choices" items={response.results} onSelect={this.handleChoiceSelect} />})
    }
  }

  handleChoiceSelect = (query) => {
    this.toggleModal(null)
    console.log('QID', query);
    this.getLocation(query);
  }

  getLocation = (query) => {
    this.props.loading(1)
    this.props.getWeather(query)
  }

  afterdark(sp, now){
    let hr = parseInt(now),
    sunrise = parseInt(sp.sunrise.minute)<30 ? parseInt(sp.sunrise.hour) : parseInt(sp.sunrise.hour)+1,
    sunset = parseInt(sp.sunset.minute)<30 ? parseInt(sp.sunset.hour) : parseInt(sp.sunset.hour)+1
    //console.log(hr, sunrise, sunset )
    return ((hr > sunrise ) && (hr < sunset)) ? false : true
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

  handleDayClick = (id) => {
    //console.log('handleDayClick', id)
    let chart = document.querySelectorAll('.chart')[0]
    let { hourly } = this.props.weather,
    hrs = hourly.map(hour => hour.FCTTIME)
    let midnitehours = this.midniteHrs(hrs);
    let startHr
    if (id===0){
      chart.style.WebkitTransform = 'translate3d(0, 0, 0)'
      chart.style.MozTransform = 'translate3d(0, 0, 0)'
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

  toggleFavorite = () => {
    this.props.toggleFavorite(this.props.weather.location)
  }

  render() {

    let { hrIndex, svgWidth, svgHeight } = this.state
    let { response, unit, hourly, sunphase, isLoading, location } = this.props.weather
    let { favorites } = this.props.favorites
    let validData = !isLoading && !response.error && !response.results

    //console.log('validData', validData)
    //console.log('RESULT unit is metric', unit==='metric')

    let dates, conditions, icons, isDark, isFavorite, isMetric = unit==='metric' ? 0 : 1

    if (validData) {
      let idx = _.findIndex(favorites, function(i) { return i.l === location.l })
      isFavorite = idx !== -1 ? 1 : 0

      //console.log('isFavorite / idx', isFavorite, idx)
      dates = hourly.map(hour => hour.FCTTIME),
      conditions = hourly.map(hour => hour.wx),
      icons = hourly.map(hour => hour.icon),
      isDark = !isLoading ? this.afterdark(sunphase, dates[hrIndex].hour) : false
      //console.log('isDark',isDark)
    }

    const noMargin = {margin:'0px'}
    const noPadding = {padding:'0px'}
    const colStyle = {padding:'0 0 0 4px'}

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
              <Col xs={2} style={colStyle}>
                <ToggleBtn toggleFunction={this.toggleUnit} options={unitOptions} state={isMetric} styleClass="unit pull-left" />
              </Col>
              <Col xs={8} style={colStyle}>
                <div className="time">{validData ? <h2>{dates[hrIndex].weekday_name}, {dates[hrIndex].civil}</h2> : null}</div>
              </Col>
              <Col xs={2} style={colStyle}>
                <ToggleBtn toggleFunction={this.toggleFavorite} options={favoriteOptions} state={isFavorite} styleClass="pull-right no-boundary"/>
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
          <Meters hrIndex={hrIndex} chart={this.state.chart} onSelect={(type)=>{this.setState({chart:type})}}/>
          <Charts hrIndex={hrIndex} chart={this.state.chart} onMouseOver={this.handleChartHover}/>
          <DayForecast dayIndex={this.state.dayIndex} onSelect={this.handleDayClick}/>
        </div>
      </div>
    )
  }
}

WeatherResult.propTypes = {
  getWeather: PropTypes.func.isRequired,
  loading: PropTypes.func.isRequired,
  toggleUnit: PropTypes.func.isRequired,
  toggleModal: PropTypes.func.isRequired,
  toggleFavorite: PropTypes.func.isRequired,
  weather: PropTypes.shape({
    unit: PropTypes.string.isRequired,
    isLoading: PropTypes.bool.isRequired,
    response: PropTypes.object.isRequired,
    hourly: PropTypes.array,
    sunphase: PropTypes.object,
    location: PropTypes.object
  }),
  favorites: PropTypes.shape({
    favorites: PropTypes.array.isRequired
  })
}

WeatherResult.defaultProps = {
  weather: PropTypes.shape({
    unit: 'metric',
    isLoading: false,
    response: {},
    hourly: [],
    sunphase: {},
    location: {}
  })
}

function mapStateToProps({ weather, favorites }){
  return { weather, favorites }
}

export default connect(mapStateToProps, { getWeather, loading, toggleUnit, toggleFavorite, toggleModal })(WeatherResult)
