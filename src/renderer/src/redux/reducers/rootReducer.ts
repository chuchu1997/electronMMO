import { combineReducers } from 'redux'
import profileReducer from './profileReducer' // Import reducer cho user profile
import manageViewReducer from './manageViewReducer'
const rootReducer = combineReducers({
  userProfile: profileReducer,
  currentView: manageViewReducer
})

export default rootReducer
