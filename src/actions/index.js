import axios from 'axios'

const API_KEY = '0397f1acfa8a3cd2'
const API_URL = 'http://api.wunderground.com/api/'
const API_PARAMS = '/geolookup/hourly10day/forecast/astronomy/'

export const GET_WEATHER = 'GET_WEATHER'

export function getWeather(location) {
  let encodedLocation = encodeURIComponent(location)
  const requestUrl = `${API_URL}${API_KEY}${API_PARAMS}/q/${encodedLocation}.json`
  const request = axios.get(requestUrl)
  
  console.log('request', request)

  return {
    type: GET_WEATHER,
    payload: request
  }
}
