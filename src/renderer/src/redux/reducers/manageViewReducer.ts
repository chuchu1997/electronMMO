import { ManageView } from 'src/types'
import { SET_CURRENT_VIEW } from '../actions'

const initialViewState: ManageView = {
  view: 'create-profile'
}

const manageViewReducer = (state = initialViewState, action) => {
  switch (action.type) {
    case SET_CURRENT_VIEW:
      return {
        ...action.payload
      }

    default:
      return state
  }
}

export default manageViewReducer
