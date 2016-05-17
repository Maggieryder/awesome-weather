import axios from 'axios'

const API_KEY = '0397f1acfa8a3cd2'
const API_URL = 'http://api.wunderground.com/api/'
const API_PARAMS = '/conditions/hourly/forecast'

let unit

const WeatherAPI = {

  getWeather(location){
    let encodedLocation = encodeURIComponent(location)
    let requestUrl = `${API_URL}${API_KEY}${API_PARAMS}/q/${encodedLocation}.json`
    return axios.get(requestUrl).then((res) => {
      //debugger;
      console.log('res.data', res.data)
      if (res.data.response.error){
        throw new Error(res.data.response.error.description)
      } else if (res.data.response.results){
        console.log('CHOICES', this.getChoices(res.data.response.results))
        return {choices: this.getChoices(res.data.response.results)}
      } else {
        return {
          unit: this.getUnits(),
          location: this.getLocationParams(res.data.current_observation.display_location),
          now: this.getCurrentConditions(res.data.current_observation),
          forecast: this.getForecast(res.data.forecast),
          hourly: this.getHourly(res.data.hourly_forecast)
        }
      }
    }, (res) => {
      throw new Error('SOMETHING WENT WRONG',res.data.response.error.description)
    })
  },

  getChoices(choices){
    return choices.map((n) => {
      return {
        name: n.city + ', ' + (n.state ? n.state : n.country_name),
        l: n.l.replace('/q/','')
      }
    })
  },

  getLocationParams(location){
    return {
      locationString: location.city +', '+(location.state ? location.state : location.country),
      locationCoords: location.latitude+location.longitude
    }
  },

  getCurrentConditions(currentConditions){
    let temp = this.getUnits()==='metric' ? 'temp_c' : 'temp_f'
    let feel = this.getUnits()==='metric' ? 'feelslike_c' : 'feelslike_f'
    //let tempUnit = this.getUnits()==='metric' ? ' &deg;C' : ' &deg;F'
    let spd = this.getUnits()==='metric' ? 'wind_kph' : 'wind_mph'
    let gust = this.getUnits()==='metric' ? 'wind_gust_kph' : 'wind_gust_mph'
    let spdUnit = this.getUnits()==='metric' ? ' km/h' : ' mph'
    let pUnit = this.getUnits()==='metric' ? 'precip_today_metric' : 'precip_today_in'
    let pUnitSuffix = this.getUnits()==='metric' ? ' mm' : ' in'
    return {
      temp: Math.round(currentConditions[temp]),
      feel: Math.round(currentConditions[feel]),
      winddir: currentConditions.wind_dir,
      windspd: currentConditions.wind_mph===0 ? 'Calm' : Math.round(currentConditions[spd]) + spdUnit,
      gust: Math.round(currentConditions[spd]) + spdUnit,
      precip: currentConditions[pUnit]+pUnitSuffix,
      desc: currentConditions.weather,
      icon: currentConditions.icon_url.replace('/k/', '/i/')
    }
  },
  getForecast(forecast){
    return forecast.txt_forecast.forecastday
  },

  getHourly(hourly){
    return hourly.map(hour => {
      return {
          day: hour.FCTTIME.weekday_name + ', ' + hour.FCTTIME.month_name + ' ' + hour.FCTTIME.mday +', '+ hour.FCTTIME.year,
          hr: hour.FCTTIME.civil,
          condition: hour.condition,
          icon_url: hour.icon_url.replace('/k/', '/i/'),
          temp: this.getUnits()==='metric' ? hour.temp.metric : hour.temp.english,
          wdir: hour.wdir.dir,
          wspd: this.getUnits()==='metric' ? hour.wspd.metric : hour.wspd.english,
          pop: hour.pop +'%',
          humidity: hour.humidity +'%'
        }
    })
  },

  getUnits(){
    return unit || 'metric'
  },

  setUnits(u){
    unit = u
  }

}

export default WeatherAPI
