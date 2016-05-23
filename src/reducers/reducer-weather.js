import { GET_WEATHER } from '../actions/index'

const INITIAL_STATE = {
  response: {},
  forecast: {},
  hourly: [],
  location: {},
  sunphase: {},
  unit: 'english'
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
      forecast: action.payload.data.forecast,
      hourly: action.payload.data.hourly_forecast,
      location: action.payload.data.location,
      sunphase: action.payload.data.sun_phase
    }
    default:
      return state
  }
  return state
}
