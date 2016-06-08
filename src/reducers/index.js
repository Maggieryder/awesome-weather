import { combineReducers } from 'redux'
import WeatherReducer from './reducer-weather'
import ModalReducer from './reducer-modal'
import LocationsReducer from './reducer-locations'

const rootReducer = combineReducers({
  locations: LocationsReducer,
  weather: WeatherReducer,
  modal: ModalReducer
})

export default rootReducer
