import { GET_WEATHER, TOGGLE_UNIT, TOGGLE_FAVORITE } from '../actions/index'

const UNITS = ['metric','english']
const INITIAL_STATE = {
  response: {},
  forecast: {},
  hourly: [],
  location: {},
  sunphase: {},
  unit: UNITS[0],
  favorites: []
}

let favoriteLocations = []

export default function(state = INITIAL_STATE, action) {
  switch(action.type){
    case GET_WEATHER:
    console.log('action recieved', action.payload.data)
    //multiple cities
    // return state.concat([action.payload.data])
    // OR
    // return [ action.payload.data, ...state]
    // return { ...state, all: action.payload.data}
    return { ...state,
      response: action.payload.data.response,
      forecast: action.payload.data.forecast,
      hourly: action.payload.data.hourly_forecast,
      location: action.payload.data.location,
      sunphase: action.payload.data.sun_phase
    }
    case TOGGLE_UNIT:
    //console.log('action recieved for UNIT change', action.payload.unit)
    return {...state, unit: UNITS[action.payload.unit]}
    case TOGGLE_FAVORITE:
    console.log('action recieved for ADD FAVORITE', action.payload.favorite)
    return {...state, favorites: [action.payload.favorite]}
    default:
      return state
  }
  return state
}
