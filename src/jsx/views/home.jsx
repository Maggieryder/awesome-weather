import React, {Component} from 'react';
import { connect } from 'react-redux';
import { getWeather, loading} from '../../actions/index';

import ModalInstance from '../components/modal'
import WeatherResult from '../components/weather-result';

class Home extends Component {
  componentWillMount(){
    this.getLocation('autoip');
  }

  getLocation = (query) => {
    this.props.loading(true)
    this.props.getWeather(query)
  }

  handleChoiceSelect = (query) => {
    console.log('QID', query);
    this.getLocation(query);
  }

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

export default connect(mapStateToProps, { getWeather, loading })(Home);
