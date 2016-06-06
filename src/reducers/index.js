import { combineReducers } from 'redux'
import WeatherReducer from './reducer-weather'
import ModalReducer from './reducer-modal'

const rootReducer = combineReducers({
  weather: WeatherReducer,
  modal: ModalReducer
})

export default rootReducer
