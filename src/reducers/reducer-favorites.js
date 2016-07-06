import _ from 'lodash'

import { setLocalDataArray, getLocalDataArray } from '../api/persist-data'
import { TOGGLE_FAVORITE } from '../actions/index'

const INITIAL_STATE = {
  favorites: getLocalDataArray('favorites')
}

export default function(state = INITIAL_STATE, action) {
  switch(action.type){
    case TOGGLE_FAVORITE: {
      //console.log('action recieved for ADD FAVORITE', action.payload.favorite)
      let favorites = state.favorites.slice();
      //let idAlreadyExists = favorites.indexOf(action.payload.favorite) > -1;
      let idx = _.findIndex(favorites, function(i) { return i.l === action.payload.favorite.l });
      let idAlreadyExists = idx > -1;
      //console.log('FAVORITE already exists at index', idAlreadyExists, idx)
      if(idAlreadyExists) {
        //favorites = favorites.filter(id => id != action.payload.favorite);
        favorites.splice(idx, 1);
      }
      else {
        favorites.push(action.payload.favorite)
      }
      setLocalDataArray('favorites', favorites)
      return {...state, favorites }
    }

    // default return
    default:
    return state
  }
}
