import React, { Component } from 'react';
import { connect } from 'react-redux'
import { toggleLocationList } from '../../actions/index'
import { Col, Glyphicon } from 'react-bootstrap';

import ToggleBtn from '../components/toggle-btn'
import WeatherForm from '../components/weather-form.jsx';

class Header extends Component {
  constructor(props) {
    super(props);
    //console.log('>>> HEADER PROPS', this.props)
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
    let { location, isLoading } = this.props.weather
    let title = !isLoading && location ? location.city +', '+(location.state ? location.state : location.country) : ''
    const noPadding = {padding:'0px'}
    const listOptions = [
      <Glyphicon glyph="option-vertical" />,
      <Glyphicon glyph="menu-right" />
    ]
    const toggleLocationList = this.toggleLocationList.bind(this)

    return (
      <header>

        <Col xs={2} style={noPadding}>
          <ToggleBtn toggleFunction={toggleLocationList} options={listOptions} styleClass="pull-left no-boundary" />
        </Col>

        {!this.state.isSearching ?  <Col xs={8} style={noPadding}>
                                      <h1>{title}</h1>
                                    </Col> : null }

        <Col xs={!this.state.isSearching ? 2 : 10} sm={!this.state.isSearching ? 2 : 6} smOffset={!this.state.isSearching ? 0 : 4} style={noPadding}>
          <WeatherForm onSearch={this.changeLayout.bind(this)}/>
        </Col>

      </header>
    );
  }
}

function mapStateToProps({weather}){
  return { weather }
}

export default connect(mapStateToProps, { toggleLocationList })(Header)
