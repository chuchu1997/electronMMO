import { combineReducers } from 'redux'
import manageViewReducer from './manageViewReducer'
import { chromeProfileStateReducer } from './chromeProfileWithStateReducer'
import { createProfileReducer } from './CreateProfileReducer'

const rootReducer = combineReducers({
  currentView: manageViewReducer,
  chromeProfileWithState: chromeProfileStateReducer,
  createUserProfileState: createProfileReducer
})

export default rootReducer
