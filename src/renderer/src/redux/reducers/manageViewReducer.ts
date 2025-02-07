import { UserProfileType, ManageView } from '@shared/models'
import { SET_CURRENT_VIEW } from '../actions'

const initialViewState: ManageView = {
  view: 'dashboard'
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
