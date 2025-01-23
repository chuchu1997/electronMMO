import { UserProfileType } from 'src/types'

export const UPDATE_USER_PROFILE = 'UPDATE_USER_PROFILE'
export const CLEAR_USER_PROFILE = 'CLEAR_USER_PROFILE'

export const updateUserProfile = (profile: UserProfileType) => ({
  type: UPDATE_USER_PROFILE,
  payload: profile
})

export const clearUserProfile = () => ({
  type: CLEAR_USER_PROFILE
})
