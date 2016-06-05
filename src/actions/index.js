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

export const TOGGLE_UNIT = 'TOGGLE_UNIT'

export function toggleUnit(val) {
  console.log('toggle value', val)

  return {
    type: TOGGLE_UNIT,
    payload: {unit: val}
  }
}

export const TOGGLE_FAVORITE = 'TOGGLE_FAVORITE'

export function toggleFavorite(loc, val) {
  console.log('toggle location', loc)
  console.log('toggle value', val)

  return {
    type: TOGGLE_FAVORITE,
    payload: {favorite: val}
  }
}

export const TOGGLE_LOCATION_LIST = 'TOGGLE_LOCATION_LIST'

export function toggleLocationList(val) {
  console.log('isShowingList', val)

  return {
    type: TOGGLE_LOCATION_LIST,
    payload: {isShowingList: val}
  }
}

export const IS_LOADING = 'IS_LOADING'

export function loading(val) {
  console.log('loading', val)

  return {
    type: IS_LOADING,
    payload: {isLoading: val}
  }
}
