import { AUTO_COMPLETE } from '../actions/index'

const INITIAL_STATE = {
  locations: []
}

export default function(state = INITIAL_STATE, action) {
  switch(action.type){
    case AUTO_COMPLETE:
    console.log('action recieved for AUTO COMPLETE', action.payload.RESULTS)
    return {...state, locations: [action.payload.results]}

    default:
    return state
  }
}
