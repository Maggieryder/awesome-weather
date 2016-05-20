import React, {Component} from 'react'
//import Actions from '../../actions/actions'
//import WeatherStore from '../../stores/weather-store'
import WeatherForm from '../components/form-weather.jsx'
import WeatherResult from '../components/result-weather.jsx'
import WeatherAPI from '../../api/api-weather.jsx'
import {Link} from 'react-router'

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading:false,
      unit: 0
    }
  }
  handleSearch(location){
    console.log('SUBMITTED!', location)
    this.setState({isLoading:true})
    WeatherAPI.getWeather(location).then((weather) => {
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
    })
  }

  handleUnitChange(unit){
    WeatherAPI.setUnits(unit)
    this.setState({unit:unit})
    /*if(this.state.location) {
      this.handleSearch(this.state.location.locationString, unit)
    }*/
  }

  chooseClick(e){
    console.log('QID', e.target.id)
    e.preventDefault();
    this.handleSearch(e.target.id)
  }

  render(){
    let {isLoading, choices, location, now, forecast, hourly, sunphase, unit} = this.state;
    let search = () => {
      return (
        <div className="col-sm-6 col-xs-12">
          <WeatherForm onSearch={this.handleSearch.bind(this)} onUnitChange={this.handleUnitChange.bind(this)}/>
        </div>
      )
    }

    function renderMessage(){
      if (isLoading){
        return <h2 style={{marginLeft: '20px'}}>Fetching weather...</h2>
      } else if (choices) {
        let chooseList = choices.map((n,id) => {
          return <li key={id} onClick={that.chooseClick.bind(that)} id={n.l}>{n.name}</li>
        })
        return <ul style={{marginLeft: '20px'}}>{chooseList}</ul>
      } else if (location && now){
        return <WeatherResult unit={unit} hourly={hourly} sun={sunphase}/>
      }
    }

    return (
      <div>
        <div className="row">
          <div className="col-sm-6 col-xs-12">
            <h2 style={{textAlign:'center'}}>{this.state.location ? this.state.location.locationString : 'Enter location'}</h2>
          </div>
          { !this.state.location ? search() : null}
        </div>
        {renderMessage()}
      </div>
    )
  }
}

export default Home

/*
<div className="col-sm-6 col-xs-12">
  <WeatherForm onSearch={this.handleSearch.bind(this)} onUnitChange={this.handleUnitChange.bind(this)}/>
</div>
*/
