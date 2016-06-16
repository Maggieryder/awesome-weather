import { combineReducers } from 'redux'
import WeatherReducer from './reducer-weather'
import ModalReducer from './reducer-modal'
import LocationsReducer from './reducer-locations'
import FavoritesReducer from './reducer-favorites'

const rootReducer = combineReducers({
  locations: LocationsReducer,
  favorites: FavoritesReducer,
  weather: WeatherReducer,
  modal: ModalReducer
})

export default rootReducer
