import React, {Component} from 'react'
import { connect } from 'react-redux'
//import Actions from '../../actions/actions'
//import WeatherStore from '../../stores/weather-store'
import WeatherForm from '../components/form-weather.jsx'
import WeatherResult from '../components/result-weather.jsx'
//import WeatherAPI from '../../api/api-weather.jsx'
import {Link} from 'react-router'

class Home extends Component {
  constructor(props) {
    super(props);
    let weather = this.props.weather
    console.log('>>> HOMEPROPS', this.props.weather)

    this.state = {
      isLoading:false,
      error: null,
      multipleChoices: null,
      unit: 'metric'
    }
  }

  handleSearch(location){
    console.log('SUBMITTED!', location)
    this.setState({isLoading:true})
    /*WeatherAPI.getWeather(location).then((weather) => {
      console.log('weather', weather);
      //this.setState({weather})
      let {choices, location, now, hourly, sunphase, unit} = weather
      this.setState({
        isLoading:false,
        choices:choices,
        location:location,
        sunphase:sunphase,
        now:now,
        hourly:hourly
      })
    }, (error) => {
      this.setState({isLoading:false})
      alert(error)
    })*/
  }

  handleUnitChange = (e) => {
    //WeatherAPI.setUnits(e.target.getAttribute('data-unit'))
    this.setState({unit:e.target.getAttribute('data-unit')})
  }

  handleChoicePick = (e) => {
    console.log('QID', e.target.id)
    e.preventDefault();
    this.handleSearch(e.target.id)
  }

  handleMultipleChoices = (choices) => {
    return choices.map((n, id) => {
      let name = n.city + ', ' + (n.state ? n.state : n.country_name),
      q = n.l.replace('/q/','')
      return <li key={id} onClick={this.handleChoicePick} id={q}>{name}</li>
    })
  }

  render(){
    //let {isLoading, choices, location, now, forecast, hourly, sunphase, unit} = this.state;
    const that = this

    function renderMessage(){
      if (isLoading){
        return <h2 style={{marginLeft: '20px'}}>Fetching weather...</h2>
      } else if (choices) {
        let chooseList = choices.map((n,id) => {
          return <li key={id} onClick={that.handleChoicePick} id={n.l}>{n.name}</li>
        })
        return <ul style={{marginLeft: '20px'}}>{chooseList}</ul>
      } else if (location && now){
        return <WeatherResult unit={unit}/>
      }
    }

    function renderPageOptions(weather){
      if (weather){
        let {response, location, unit} = weather
        console.log('renderPageOptions')
        if (response.error ) {
          console.log('ERROR', response)
          return <div>{response.error.description}</div>
        } else if (response.results){
          console.log('CHOICES', response)
          return that.handleMultipleChoices(response.results)
        } else if (location.city){
          return <WeatherResult />
        }
      }
    }

    return (
      <div>
        {/*<div className="row">
          <div className="col-sm-6 col-xs-12">
            <h2 style={{textAlign:'center'}}>{this.state.location ? this.state.location.locationString : 'Enter location'}</h2>
          </div>
        </div>*/}
        {renderPageOptions(this.props.weather)}

        {/*<div className="row">
          <div className="col-sm-6 col-xs-12" style={{paddingTop:'20px'}}>
            <div className="btn-toolbar" role="toolbar" aria-label="...">
              <div className="btn-group" role="group" aria-label="temperature units" onClick={this.handleUnitChange.bind(this)}>
                <button type="button" className={this.state.unit==='english' ? "btn btn-default" : "btn btn-primary"} data-unit="metric" active>C</button>
                <button type="button" className={this.state.unit==='metric' ? "btn btn-default" : "btn btn-primary"} data-unit="english" >F</button>
              </div>
            </div>
          </div>
        </div>*/}
      </div>
    )
  }
}

function mapStateToProps({weather}){
  console.log('weather', weather)
  return {weather}
}

export default connect(mapStateToProps)(Home)

/*
<div className="btn-group" role="group" aria-label="speed units" onClick={this.handleUnitChange.bind(this)}>
  <button type="button" className={this.state.unit==='english' ? "btn btn-default" : "btn btn-primary"} data-unit="metric" >km/h</button>
  <button type="button" className={this.state.unit==='metric' ? "btn btn-default" : "btn btn-primary"} data-unit="english" >mph</button>
</div>

<div className="btn-group" data-toggle="buttons-radio">
  <label className="btn btn-default active">
    <input type="radio" className="options" id="option1" autocomplete="off" defaultChecked /> Centigrade
  </label>
  <label className="btn btn-default">
    <input type="radio" className="options" id="option2" autocomplete="off" /> Farenheit
  </label>
</div>
*/
