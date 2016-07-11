import { TOGGLE_UNIT } from '../actions/index'
import { setLocalData, getLocalData } from '../api/persist-data'

const UNITS = ['metric','english']

const INITIAL_STATE = getLocalData('unit') ? UNITS[getLocalData('unit')] : UNITS[0]

export default function(state = INITIAL_STATE, action) {
  switch(action.type){
    case TOGGLE_UNIT:{
      //console.log('action recieved for UNIT change', action.unit)
      setLocalData('unit', action.unit)
      return UNITS[action.unit]
    }
    default:
      return state
  }
}
