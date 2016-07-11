import { combineReducers } from 'redux'
import WeatherReducer from './reducer-weather'
import ModalReducer from './reducer-modal'
import LocationsReducer from './reducer-locations'
import FavoritesReducer from './reducer-favorites'
import UnitReducer from './reducer-unit'

const rootReducer = combineReducers({
  locations: LocationsReducer,
  favorites: FavoritesReducer,
  weather: WeatherReducer,
  unit: UnitReducer,
  modal: ModalReducer
})

export default rootReducer
