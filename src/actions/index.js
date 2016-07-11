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

export const TOGGLE_UNIT = 'TOGGLE_UNIT'

export function toggleUnit(unit) {
  return {
    type: TOGGLE_UNIT,
    unit // ES6 syntax - is same as unit: unit
  }
}

export const ADD_FAVORITE = 'ADD_FAVORITE'

export function addFavorite(favorite) {
  return {
    type: ADD_FAVORITE,
    favorite // ES6 syntax - is same as favorite: favorite
  }
}

export const REMOVE_FAVORITE = 'REMOVE_FAVORITE'

export function removeFavorite(favorite) {
  return {
    type: REMOVE_FAVORITE,
    favorite // ES6 syntax - is same as favorite: favorite
  }
}

export const IS_LOADING = 'IS_LOADING'

export function loading(status) {
  //console.log('loading', status)
  return {
    type: IS_LOADING,
    status // ES6 syntax - is same as status: status
  }
}

export const TOGGLE_MODAL_OPEN = 'TOGGLE_MODAL_OPEN'

export function toggleModal(content) {
  //console.log('toggle content', content)
  return {
    type: TOGGLE_MODAL_OPEN,
    content // ES6 syntax - is same as content: content
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
