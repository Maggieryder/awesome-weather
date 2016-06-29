import React, { Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import { getWeather, loading} from '../../actions/index';

import ModalInstance from 'Modal'
import WeatherResult from 'WeatherResult';

class Home extends Component {
  componentWillMount(){
    this.getLocation('autoip');
  }

  getLocation = (query) => {
    this.props.loading(1)
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

Home.propTypes = {
  getWeather: PropTypes.func.isRequired,
  loading: PropTypes.func.isRequired
}

function mapStateToProps({weather}){
  return {weather}
}

export default connect(mapStateToProps, { getWeather, loading })(Home);
