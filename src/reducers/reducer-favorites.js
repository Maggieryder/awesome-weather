import { ADD_FAVORITE, REMOVE_FAVORITE } from '../actions/index'
import { setLocalDataArray, getLocalDataArray } from '../api/persist-data'

const INITIAL_STATE = getLocalDataArray('favorites') || []

export default function(state = INITIAL_STATE, action) {
  switch(action.type){
    case ADD_FAVORITE:
      //console.log('action recieved for ADD FAVORITE', action.favorite)
      setLocalDataArray('favorites', [...state, action.favorite])
      return [...state, action.favorite]

    case REMOVE_FAVORITE:
      //console.log('action recieved for REMOVE FAVORITE', action.favorite)
      setLocalDataArray('favorites', state.filter((favorite) => favorite.l !== action.favorite.l))
      return state.filter((favorite) => favorite.l !== action.favorite.l)
      
    default:
      return state
  }
}
