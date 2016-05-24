import { GET_WEATHER, TOGGLE_UNIT } from '../actions/index'

const UNITS = ['metric','english']
const INITIAL_STATE = {
  response: {},
  forecast: {},
  hourly: [],
  location: {},
  sunphase: {},
  unit: UNITS[0]
}

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
      forecast: action.payload.data.forecast.simpleforecast.forecastday,
      hourly: action.payload.data.hourly_forecast,
      location: action.payload.data.location,
      sunphase: action.payload.data.sun_phase
    }
    case TOGGLE_UNIT:
    //console.log('action recieved for UNIT change', action.payload.data.unit)
    return {...state, unit: UNITS[action.payload.unit]}
    default:
      return state
  }
  return state
}
