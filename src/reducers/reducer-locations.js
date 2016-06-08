import { TOGGLE_FAVORITE, AUTO_COMPLETE } from '../actions/index'

const INITIAL_STATE = {
  favorites: [],
  locations: []
}

export default function(state = INITIAL_STATE, action) {
  switch(action.type){
    case AUTO_COMPLETE:
    console.log('action recieved for AUTO COMPLETE', action.payload.RESULTS)
    return {...state, locations: [action.payload.results]}
    case TOGGLE_FAVORITE:
    console.log('action recieved for ADD FAVORITE', action.payload.favorite)
    return {...state, favorites: [action.payload.favorite]}
  }
  return state
}
