export const UPDATE_STATE_CHROME_PROFILE = 'UPDATE_CHROME_PROFILE'
export const UpdateStateForChromeProfile = (profile) => {
  return {
    type: UPDATE_STATE_CHROME_PROFILE,
    payload: profile
  }
}
