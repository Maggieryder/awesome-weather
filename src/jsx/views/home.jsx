import React, {Component} from 'react';
import { connect } from 'react-redux';
import { getWeather, loading } from '../../actions/index';
import {Link} from 'react-router';
import WeatherForm from '../components/form-weather.jsx';
import WeatherResult from '../components/result-weather.jsx';
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
    //.then(() =>{this.props.isLoading(false)})
  }

  render(){
    let {isLoading} = this.props.weather;
    const that = this;
    let divInfoStyle = {
      height:'100%',
      textAlign:'center',
      paddingTop:'200px'
    }

    //if (isLoading){
      //console.log('IS LOADING')
      //return <div style={divInfoStyle}>LOADING...</div>
    //}

    function renderPageOptions(weather){
      if (weather){
        console.log('RENDER PAGE', weather)
        let {response, location, unit, isLoading } = weather
        if (response.error ) {
          console.log('ERROR', response.error.description)
          return <div style={divInfoStyle}><h2>{response.error.description}</h2></div>
        } else if (response.results){
          console.log('CHOICES', response.results)
          return <MultipleChoices items={response.results} onSelect={that.handleChoiceSelect} />
        } else {
          return <WeatherResult />
        }
      }
    }

    return (
      <div>
        {renderPageOptions(this.props.weather)}
      </div>
    );
  }
}

function mapStateToProps({weather}){
  return {weather}
}

export default connect(mapStateToProps, { getWeather, loading })(Home);
