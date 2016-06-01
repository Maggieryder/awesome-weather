import React, { Component } from 'react';
import { connect } from 'react-redux'
import { toggleLocationList } from '../../actions/index'
import Bootstrap, { Row, Col, Modal, Nav, NavDropdown, MenuItem } from 'react-bootstrap';
import ToggleBtn from '../components/toggle-btn'

//import Nav from '../components/nav.jsx';
import WeatherForm from '../components/form-weather.jsx';

class Header extends Component {
  constructor(props) {
    super(props);
    console.log('>>> HEADER PROPS', this.props)
    this.state = {
      isSearching:false
    }
  }
  toggleLocationList(val){
    this.props.toggleLocationList(val)
  }
  changeLayout(val){
    this.setState({isSearching:val})
  }
  render(){
    let { location } = this.props.weather
    let title = !location.city ? '' : location.city +', '+(location.state ? location.state : location.country)
    const colPadding = {padding:'0px'}
    const listOptions = [
      <span className="glyphicon glyphicon-option-vertical" aria-hidden="true"></span>,
      <span className="glyphicon glyphicon-menu-right" aria-hidden="true" ></span>
    ]
    const toggleLocationList = this.toggleLocationList.bind(this)

    return (
      <header>

        <Col xs={2} style={colPadding}>
          <ToggleBtn toggleFunction={toggleLocationList} options={listOptions} styleClass="pull-left no-boundary" />
        </Col>

        {!this.state.isSearching ?  <Col xs={8} style={colPadding}>
                                      <h2 style={{textAlign:'center'}}>{title}</h2>
                                    </Col> : null }

        <Col xs={!this.state.isSearching ? 2 : 10} style={colPadding}>
          <WeatherForm onSearch={this.changeLayout.bind(this)}/>
        </Col>

      </header>
    );
  }
}

function mapStateToProps({weather}){
  console.log('weather', weather)
  return { weather }
}

export default connect(mapStateToProps, { toggleLocationList })(Header)

/*
{location.city +', '+(location.state ? location.state : location.country)}
<button type="button" className="navbar-toggle pull-left" >
  <span className="sr-only">Settings</span>
  <span className="glyphicon glyphicon-cog" aria-hidden="true" ></span>
  {/*<span className="icon-bar"></span>
  <span className="icon-bar"></span>
  <span className="icon-bar"></span>}
</button>
*/
