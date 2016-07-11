import { GET_WEATHER, IS_LOADING } from '../actions/index'

const INITIAL_STATE = {
  response: {},
  forecast: {},
  hourly: [],
  location: {},
  sunphase: {},
  isLoading: false
}

export default function(state = INITIAL_STATE, action) {
  switch(action.type){
    case GET_WEATHER:
      //console.log('action recieved', action.payload.data)
      // return [ action.payload.data, ...state]
      // return { ...state, all: action.payload.data}
      return { ...state,
        response: action.payload.data.response,
        forecast: action.payload.data.forecast,
        hourly: action.payload.data.hourly_forecast,
        location: action.payload.data.location,
        sunphase: action.payload.data.sun_phase,
        isLoading: false
      }
    case IS_LOADING:
      //console.log('action recieved for IS LOADING', action.status)
      return {...state, isLoading: action.status }

    default:
      return state
  }
}
