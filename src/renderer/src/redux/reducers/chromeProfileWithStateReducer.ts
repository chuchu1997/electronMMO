import { UserProfileType } from '@shared/models'
import { UPDATE_STATE_CHROME_PROFILE } from '../actions'

const initialState: UserProfileType[] = []

export const chromeProfileStateReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_STATE_CHROME_PROFILE:
      return action.payload
    default:
      return state
  }
}
