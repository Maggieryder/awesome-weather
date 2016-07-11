import { TOGGLE_MODAL_OPEN } from '../actions/index'

const INITIAL_STATE = {
  modalOpen: false,
  modalContent:null
}

export default function(state = INITIAL_STATE, action) {
  switch(action.type){
    case TOGGLE_MODAL_OPEN:
    //console.log('action recieved for TOGGLE MODAL', action.content)
    //console.log('state.modalOpen', action.content ? true : false)
    return {
      modalOpen: action.content ? true : false,
      modalContent: action.content
    }
    default:
      return state
  }
}
