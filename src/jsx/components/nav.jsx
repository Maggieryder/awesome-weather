import React, {Component} from 'react'
import {Link, IndexLink} from 'react-router'
import WeatherForm from '../components/form-weather.jsx'
import WeatherAPI from '../../api/api-weather.jsx'

/*
<nav>
  <ul>
    <li><IndexLink to="/" activeClassName="active" activeStyle={activeStyle} >NOW</IndexLink></li>
    <li><Link to="users/hourly" activeClassName="active" activeStyle={activeStyle} >HOURLY</Link></li>
    <li><Link to="users/3-day" activeClassName="active" activeStyle={activeStyle} >3-DAY</Link></li>
  </ul>
</nav>
*/

class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading:false,
      unit: 'metric'
    }
  }

  handleSearch(location){
    console.log('SUBMITTED!', location)
    this.setState({isLoading:true})
    WeatherAPI.getWeather(location).then((weather) => {
      console.log('weather', weather);
      //this.setState({weather})
      let {choices, location, now, hourly, unit} = weather
      this.setState({
        isLoading:false,
        choices:choices,
        location:location,
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
    if(this.state.location) {
      this.handleSearch(this.state.location.locationString, unit)
    }
  }

  chooseClick(e){
    console.log('QID', e.target.id)
    e.preventDefault();
    this.handleSearch(e.target.id)
  }

  render(){
    let activeStyle = {
      color: '#fff',
      textDecoration: 'none'
    }
    return (

      <nav className="navbar navbar-inverse navbar-primary navbar-fixed-top">
          <div className="container">
            {/* Brand and toggle get grouped for better mobile display */}
            <div className="navbar-header">

                  <Link className="navbar-brand" to="/"><span className="glyphicon glyphicon-cog" aria-hidden="true" ></span></Link>

              <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
            </div>

            {/* Collect the nav links, forms, and other content for toggling */}
            <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
              <ul className="nav navbar-nav">
                <li><Link activeClassName="active" to="/"><span className="sr-only">(current location)</span>Current location</Link></li>
                <li><Link activeClassName="active" to="/"><span className="sr-only">(favorites)</span>Favorites</Link></li>
                <li><Link activeClassName="active" to="/"><span className="sr-only">(choose )</span>...</Link></li>


              </ul>
              <WeatherForm onSearch={this.handleSearch.bind(this)} onUnitChange={this.handleUnitChange.bind(this)}/>
            </div>{/* /.navbar-collapse */}
          </div>{/* /.container-fluid */}
        </nav>
    )
  }
}

export default Nav
