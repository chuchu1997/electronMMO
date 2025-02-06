// import { UserProfileType } from "src/types";

// export const UPDATE_CREATE_USER_PROFILE

// export const UPDATE_CREATE_USER_PROFILE = (profile:UserProfileType)=>({
//     type:
// })

import { UserProfileType } from '@shared/models'

export const UPDATE_CREATE_USER_PROFILE = 'UPDATE_CREATE_USER_PROFILE'
export const CLEAR_CREATE_USER_PROFILE = 'CLEAR_CREATE_USER_PROFILE'
export const updateCreateUserProfile = (profile: UserProfileType) => ({
  type: UPDATE_CREATE_USER_PROFILE,
  payload: profile
})

export const clearCreateUserProfile = () => ({
  type: CLEAR_CREATE_USER_PROFILE
})
