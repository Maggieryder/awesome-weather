import React, {Component} from 'react';
import { connect } from 'react-redux';
import { getWeather, loading, modal, toggleModal } from '../../actions/index';
import {Link} from 'react-router';

import ModalInstance from '../components/modal'
import WeatherResult from '../components/weather-result';
import MultipleChoices from '../components/multipleChoiceList';

class Home extends Component {
  constructor(props) {
    super(props);
    //console.log('>>> HOMEPROPS', this.props)
  }

  componentWillMount(){
    this.getLocation('autoip');
  }

  handleChoiceSelect = (query) => {
    console.log('QID', query);
    this.getLocation(query);
  }

  getLocation = (query) => {
    this.props.loading(true)
    this.props.getWeather(query)
  }


/*
componentWillReceiveProps(props){
  let { modal } = props
  console.log('componentWillReceiveProps', modal)
  if( modal && !modal.modalOpen ){
      //this.getLocation('autoip');
  }
}
  renderPageOptions(weather){
  let {isLoading} = weather;
    if (weather){
      //console.log('RENDER PAGE', weather)
      let {response, location, unit, isLoading } = weather
      if (response.error ) {
        console.log('ERROR', response.error.description)
        let message = <h3>{response.error.description}</h3>
        this.toggleModal({title:'YIKES!',body:response.error.description})
        //return <WeatherResult errorMsge={response.error.description}/>
      } else if (response.results){
        console.log('CHOICES', response.results)
        return <MultipleChoices items={response.results} onSelect={this.handleChoiceSelect} />
      } else {
        return <WeatherResult />
      }
    }
  }

  toggleModal = (content) => {
    this.props.toggleModal(content);
  }*/

  render(){
    return (
      <div>
        <WeatherResult />
        <ModalInstance onClose={this.getLocation}/>
      </div>
    );
  }
}

function mapStateToProps({weather}){
  return {weather}
}

export default connect(mapStateToProps, { getWeather, loading, toggleModal })(Home);

/*{this.renderPageOptions(this.props.weather)}*/
