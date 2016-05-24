import React, {Component} from 'react'
import {Link, IndexLink} from 'react-router'
import WeatherForm from './form-weather.jsx'
import ToggleUnit from './toggle-btn'
//import WeatherAPI from '../../api/api-weather.jsx'

class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading:false,
      unit: 'metric'
    }
  }

  handleChoicePick(e){
    console.log('QID', e.target.id)
    e.preventDefault();
    //this.handleSearch(e.target.id)
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
              <div className="navbar-brand">
                <ToggleUnit />
              </div>
              <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                <span className="sr-only">Toggle Searchbar</span>
                <span className="glyphicon glyphicon-search" aria-hidden="true" ></span>
                {/*<span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>*/}
              </button>
            </div>


            {/* Collect the nav links, forms, and other content for toggling */}
            <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
              <ul className="nav navbar-nav">
                <li><Link activeClassName="active" to="/" role="button"><span className="sr-only">(current location)</span>Current location</Link></li>
                <li><Link activeClassName="active" to="/" role="button"><span className="sr-only">(favorites)</span><span className="glyphicon glyphicon-heart" aria-hidden="true"></span> Favorites</Link></li>
                <li><Link activeClassName="active" to="/" role="button"><span className="sr-only">(choose )</span>...</Link></li>
              </ul>
              <WeatherForm />
            </div>{/* /.navbar-collapse */}
          </div>{/* /.container-fluid */}
        </nav>
    )
  }
}

export default Nav


/*
handleUnitChange = (e) => {
  //WeatherAPI.setUnits(e.target.getAttribute('data-unit'))
  this.setState({unit:e.target.getAttribute('data-unit')})
}
<div className="btn-toolbar" role="toolbar" aria-label="...">
  <div className="btn-group" role="group" aria-label="temperature units" onClick={this.handleUnitChange}>
    <button type="button" className={this.state.unit==='english' ? "btn btn-default" : "btn btn-primary"} data-unit="metric" active>C</button>
    <button type="button" className={this.state.unit==='metric' ? "btn btn-default" : "btn btn-primary"} data-unit="english" >F</button>
  </div>
</div>
*/
