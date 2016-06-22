import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { toggleModal, getWeather, loading } from '../../actions/index';
import { Col, Glyphicon } from 'react-bootstrap';

import ToggleBtn from '../components/toggle-btn';
import WeatherForm from '../components/weather-form.jsx';
import MultipleChoices from '../components/multiple-choice-list';

class Header extends Component {
  constructor(props) {
    super(props);
    //console.log('>>> HEADER PROPS', this.props)
    this.state = {
      isSearching:false
    }
  }
  toggleLocationList(){
    let { favorites } = this.props.favorites
    let { location } = this.props.weather
    //console.log('location.l', location.l.replace('/q/',''))
    let body = favorites.length >= 1 ? <MultipleChoices className="favorites" items={favorites} onSelect={this.handleChoiceSelect} /> : <span>You have no favorites</span>
    this.props.toggleModal({title:'FAVORITES',body:body,lastLocation:location.l.replace('/q/','')})
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

  changeLayout(val){
    this.setState({isSearching:val})
  }

  render(){
    let { location, isLoading } = this.props.weather
    //console.log('HEADER isLoading', isLoading)

    let title = !isLoading && location ? location.city +', '+(location.state ? location.state : location.country) : ''
    const noPadding = {padding:'0px'}
    const listOptions = [
      <Glyphicon glyph="option-vertical" />
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

Header.propTypes = {
  getWeather: PropTypes.func.isRequired,
  loading: PropTypes.func.isRequired,
  toggleModal: PropTypes.func.isRequired,
  weather: PropTypes.shape({
    isLoading: PropTypes.bool.isRequired,
    location: PropTypes.object
  }),
  favorites: PropTypes.shape({
    favorites: PropTypes.array.isRequired
  })
}

function mapStateToProps({ weather, favorites}){
  return { weather, favorites }
}

export default connect(mapStateToProps, { toggleModal, getWeather, loading })(Header)
