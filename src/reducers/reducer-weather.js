import { GET_WEATHER, TOGGLE_UNIT, IS_LOADING } from '../actions/index'
import { setLocalData, getLocalData } from '../api/persist-data'

const UNITS = ['metric','english']
const LOADING_STATES = [false, true]

const INITIAL_STATE = {
  response: {},
  forecast: {},
  hourly: [],
  location: {},
  sunphase: {},
  unit: getLocalData('unit') ? UNITS[getLocalData('unit')] : UNITS[0],
  isLoading: LOADING_STATES[0]
}

export default function(state = INITIAL_STATE, action) {
  switch(action.type){
    case GET_WEATHER:
    //console.log('action recieved', action.payload.data)
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
      sunphase: action.payload.data.sun_phase,
      isLoading: LOADING_STATES[0]
    }
    case TOGGLE_UNIT:{
      //console.log('action recieved for UNIT change', action.payload.unit)
      setLocalData('unit', action.payload.unit)
      return {...state, unit: UNITS[action.payload.unit]}
    }
    case IS_LOADING:
    //console.log('action recieved for IS LOADING', LOADING_STATES[action.payload.isLoading])
    return {...state, isLoading: LOADING_STATES[action.payload.isLoading] }

    default:
      return state
  }
}
