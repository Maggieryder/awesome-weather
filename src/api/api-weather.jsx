import axios from 'axios'

const API_KEY = '0397f1acfa8a3cd2'
const API_URL = 'http://api.wunderground.com/api/'
const API_PARAMS = '/conditions/hourly10day/forecast/astronomy/'

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
          hourly: this.getHourly(res.data.hourly_forecast),
          sunphase: res.data.sun_phase
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
    let temp = ['temp_c','temp_f']
    let feel = ['feelslike_c','feelslike_f']
    let spd = ['wind_kph','wind_mph']
    let gust = ['wind_gust_kph','wind_gust_mph']
    let spdUnit = [' km/h',' mph']
    let pUnit = ['precip_today_metric','precip_today_in']
    let pUnitSuffix = [' mm',' in']
    return {
      temp: Math.round(currentConditions[temp[getUnits()]]),
      feel: Math.round(currentConditions[feel[getUnits()]]),
      winddir: currentConditions.wind_dir,
      windspd: currentConditions.wind_mph===0 ? 'Calm' : Math.round(currentConditions[spd[getUnits()]]) + spdUnit[getUnits()],
      gust: Math.round(currentConditions[spd[getUnits()]]) + spdUnit[getUnits()],
      precip: currentConditions[pUnit[getUnits()]]+pUnitSuffix[getUnits()],
      desc: currentConditions.weather,
      icon_url: currentConditions.icon_url.replace('/k/', '/i/'),
      icon: currentConditions.icon
    }
  },

  getForecast(forecast){
    return forecast.txt_forecast.forecastday
  },

  getHourly(hourly){
    return hourly.map(hour => {
      return {
          date: hour.FCTTIME.month_name + ' ' + hour.FCTTIME.mday +', '+ hour.FCTTIME.year,
          day: hour.FCTTIME.weekday_name,
          time: hour.FCTTIME.civil,
          now: hour.FCTTIME.pretty,
          hr24: hour.FCTTIME.hour,
          condition: hour.wx,
          sky: hour.sky,
          icon: hour.icon,
          //icon_url: hour.icon_url.replace('/k/', '/i/'),
          temp: [hour.temp.metric, hour.temp.english],
          feel: [hour.feelslike.metric, hour.feelslike.english],
          wdir: hour.wdir.dir,
          wspd: [hour.wspd.metric+' km/h', hour.wspd.english+' mph'],
          pop: hour.pop +'%',
          humidity: hour.humidity +'%'
        }
    })
  },

  getUnits(){
    return parseInt(unit) || 0
  },

  setUnits(u){
    unit = u
  }

}

export default WeatherAPI
