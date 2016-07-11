import React, { Component, PropTypes} from 'react'
import { connect } from 'react-redux'
import { Row, Col, Glyphicon } from 'react-bootstrap';
import $ from 'jquery'
import _ from 'lodash'
import moment from 'moment'
import { getWeather, loading, toggleUnit, addFavorite, removeFavorite, toggleModal } from '../../actions/index'
import { getLocalData, setLocalData } from '../../api/persist-data'
import ToggleBtn from 'toggle-btn'
import ModalInstance from 'modal'
import MultipleChoices from 'multiple-choice-list';
import DayForecast from 'forecast-days'
import Charts from 'charts'
import Meters from 'meters'
import { getElementPosition } from '../utils/coords.js'

import WeatherIcon from 'weather-icon'

class Weather extends Component {
  constructor(props) {
    super(props);
    //console.log('RESULT PROPS >>', this.props)
    this.state = {
      hrIndex: 0,
      dayIndex: 0,
      chart: getLocalData('chart') ? getLocalData('chart') : 'temps',
      svgTransform: 0
    }
    this.toggleModal = this.props.toggleModal
    this.toggleUnit = this.props.toggleUnit
  }

  componentWillMount() {
      this.getLocation('autoip');
  }

  componentDidMount() {
    // add listeners
  }
  componentWillUnmount() {
    // remove listeners
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
    this.props.loading(true)
    this.props.getWeather(query)
  }

  toggleFavorite = () => {
    let { location } = this.props.weather
    if (this.isFavorite(location)===1) {
      this.props.removeFavorite(location)
    } else {
      this.props.addFavorite(location)
    }
  }

  isFavorite = (location) => {
    let { favorites } = this.props
    //let { location } = this.props.weather
    if (!location) return 0
    let idx = _.findIndex(favorites, function(i) { return i.l === location.l })
    return idx !== -1 ? 1 : 0
  }

  handleMeterClick = (type) => {
    setLocalData('chart', type)
    this.setState({chart: type})
  }

  afterdark(sp, now){
    let hr = parseInt(now),
    sunrise = parseInt(sp.sunrise.minute)<30 ? parseInt(sp.sunrise.hour) : parseInt(sp.sunrise.hour)+1,
    sunset = parseInt(sp.sunset.minute)<30 ? parseInt(sp.sunset.hour) : parseInt(sp.sunset.hour)+1
    //console.log(hr, sunrise, sunset )
    return ((hr > sunrise ) && (hr < sunset)) ? false : true
  }

  midniteHrs(){
    let indexes = [],
    { hourly } = this.props.weather,
    hrs = hourly.map(hour => parseInt(hour.FCTTIME.hour))
    hrs.map((value, id) => {
       if (value === 0) {
         indexes.push({id:id})
       }
    })
   return indexes
  }

  handleChartUpdate = (id) => {
    //console.log('handleChartHover', id)
    let indexes = this.midniteHrs()
    //console.log('indexes', indexes)
    let dayIndex = 0
    for (let i=0; i < indexes.length; i++){
      if (indexes[i].id > parseInt(id)){
        dayIndex = i;
        break;
      }
    }
    this.setState({
      hrIndex:id,
      dayIndex:dayIndex
    })
  }

  handleDayClick = (id) => {
    //console.log('handleDayClick', id)
    let midniteIndexes = this.midniteHrs();
    //console.log('midnitehours', midniteIndexes)
    let startHr
    if (id===0){
      this.moveChartTo({x:0})
      startHr = 0
    } else {
      let $markers = $('.hours li')
      let pos = getElementPosition($markers[midniteIndexes[id-1].id])
      //console.log('coords', pos)
      this.moveChartTo(pos)
      startHr = parseInt(midniteIndexes[id-1].id) + 12 //midday
    }
    this.setState({
      hrIndex: startHr,
      dayIndex: id
    })
  }

  moveChartTo = (pos) => {
    let chart = document.querySelectorAll('.chart')[0]
    chart.style.WebkitTransform = 'translate3d('+pos.x*-1+'px, 0, 0)'
    chart.style.MozTransform = 'translate3d('+pos.x*-1+'px, 0, 0)'
    chart.style.MsTransform = 'translate3d('+pos.x*-1+'px, 0, 0)'
    chart.style.OTransform = 'translate3d('+pos.x*-1+'px, 0, 0)'
    chart.style.Transform = 'translate3d('+pos.x*-1+'px, 0, 0)'
    this.setState({svgTransform: pos.x*-1})
  }

  render() {
    let { unit } = this.props
    let { hrIndex, dayIndex, chart, svgTransform } = this.state //, svgWidth, svgHeight
    let { response, hourly, sunphase, isLoading, location } = this.props.weather

    let validData = !isLoading && !response.error && !response.results && hourly.length >= 1
    //console.log('validData', validData)
    //console.log('WEATHER isFavorite', this.isFavorite())

    let dates, conditions, icons, isDark, isMetric = unit==='metric' ? 0 : 1

    if (validData) {
      dates = hourly.map(hour => hour.FCTTIME),
      conditions = hourly.map(hour => hour.wx),
      icons = hourly.map(hour => hour.icon),
      isDark = !isLoading ? this.afterdark(sunphase, dates[hrIndex].hour) : false
      //console.log('isDark',isDark)
    }

    const noMargin = {margin:'0px'}
    const noPadding = {padding:'0px'}
    const colStyle = {padding:'6px 8px 0px'}

    const favoriteOptions = [
      <Glyphicon glyph="heart-empty" />,
      <Glyphicon glyph="heart" />
    ]

    const unitOptions = [
      <span>&deg;C</span>,
      <span>&deg;F</span>
    ]
    //{dates[hrIndex].weekday_name}, {dates[hrIndex].civil}
    return (
      <div className='flex-container'>

        <div className='main flex-column-1 flex-container'>

          <Row className='flex-column-none' style={{margin:'0px', zIndex:5}}>
            <Col xs={2} style={colStyle}>
              <ToggleBtn toggleFunction={this.toggleUnit} options={unitOptions} state={isMetric} styleClass="unit pull-left" />
            </Col>
            <Col xs={8} style={colStyle}>
              <div className='time'>{validData ? <h2>{moment.unix(dates[hrIndex].epoch).format('dddd, h:mm a')}</h2> : null}</div>
            </Col>
            <Col xs={2} style={colStyle}>
              <ToggleBtn toggleFunction={this.toggleFavorite} options={favoriteOptions} state={this.isFavorite(location)} styleClass="pull-right no-boundary"/>
            </Col>
          </Row>

          {!isLoading ?
          <div className='flex-column-1'>
            {validData ? <div className='icon-main'>
              <WeatherIcon stroke="2" opacity={1} desc={icons[hrIndex]} isDark={isDark}/>
            </div> : null }
            <h2 className='icon-description'>{validData ? conditions[hrIndex] : null }</h2>
          </div> : <div className='flex-column-1 vertical-container' ><h2>LOADING...</h2></div>}

        </div>

        <div className='footer flex-column-none'>
          <Meters hrIndex={hrIndex} chart={chart} onSelect={this.handleMeterClick}/>
          <Charts hrIndex={hrIndex} chart={chart} transform={svgTransform} onUpdate={this.handleChartUpdate}/>
          <DayForecast dayIndex={dayIndex} onSelect={this.handleDayClick}/>
        </div>

        <ModalInstance onClose={this.getLocation}/>

      </div>
    )
  }
}

Weather.propTypes = {
  getWeather: PropTypes.func.isRequired,
  loading: PropTypes.func.isRequired,
  toggleUnit: PropTypes.func.isRequired,
  toggleModal: PropTypes.func.isRequired,
  addFavorite: PropTypes.func.isRequired,
  removeFavorite: PropTypes.func.isRequired,
  weather: PropTypes.shape({
    isLoading: PropTypes.bool.isRequired,
    response: PropTypes.object.isRequired,
    hourly: PropTypes.array,
    sunphase: PropTypes.object,
    location: PropTypes.object
  }),
  unit: PropTypes.string.isRequired,
  favorites: PropTypes.array.isRequired
}

Weather.defaultProps = {
  unit:'metric',
  favorites: [],
  weather: PropTypes.shape({
    isLoading: false,
    response: {},
    hourly: [],
    sunphase: {},
    location: {}
  })
}

function mapStateToProps({ weather, favorites, unit }){
  return { weather, favorites, unit }
}

export default connect(mapStateToProps, { getWeather, loading, toggleUnit, addFavorite, removeFavorite, toggleModal })(Weather)
