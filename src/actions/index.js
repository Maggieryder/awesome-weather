import axios from 'axios'

const API_KEY = '0397f1acfa8a3cd2'
const API_URL = 'http://api.wunderground.com/api/'
const API_PARAMS = '/geolookup/hourly10day/forecast/astronomy/'
const AUTO_COMPLETE_URL = 'http://autocomplete.wunderground.com/'//http://autocomplete.wunderground.com/aq?query=san%20f

export const GET_WEATHER = 'GET_WEATHER'

export function getWeather(location) {
  let encodedLocation = encodeURIComponent(location)
  const requestURL = `${API_URL}${API_KEY}${API_PARAMS}/q/${encodedLocation}.json`
  const request = axios.get(requestURL)

  //console.log('request', request)

  return {
    type: GET_WEATHER,
    payload: request
  }
}

export const AUTO_COMPLETE = 'AUTO_COMPLETE'

export function autoComplete(query){
  const instance = axios.create({
    headers: {'Content-type':'application/json'},
    withCredentials: false
  })
  const requestURL = `${AUTO_COMPLETE_URL}aq?query=${encodeURIComponent(query)}`
  const request = instance.get(requestURL)
  return {
    type: AUTO_COMPLETE,
    payload: request
  }
}

export const TOGGLE_UNIT = 'TOGGLE_UNIT'

export function toggleUnit(val) {
  //console.log('toggle UNIT value', val)

  return {
    type: TOGGLE_UNIT,
    payload: {unit: val}
  }
}

export const TOGGLE_FAVORITE = 'TOGGLE_FAVORITE'

export function toggleFavorite(loc) {
  //console.log('toggle favorite', loc)

  return {
    type: TOGGLE_FAVORITE,
    payload: {favorite: loc}
  }
}

export const IS_LOADING = 'IS_LOADING'

export function loading(val) {
  //console.log('loading', val)

  return {
    type: IS_LOADING,
    payload: {isLoading: val}
  }
}

export const TOGGLE_MODAL_OPEN = 'TOGGLE_MODAL_OPEN'

export function toggleModal(content) {
  //console.log('toggle content', content)

  return {
    type: TOGGLE_MODAL_OPEN,
    payload: {content:content}
  }
}
