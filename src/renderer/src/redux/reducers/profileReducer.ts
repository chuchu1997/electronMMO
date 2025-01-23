import { UserProfileType } from 'src/types'
import { UPDATE_USER_PROFILE, CLEAR_USER_PROFILE } from '../actions/index'

const initialProfileState: UserProfileType = {
  profileName: '',
  browser: 'chrome',
  os: '',
  version: 130,
  userAgent:
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/132.0.0.0 Safari/537.36',
  screen: '',
  cpu: 8,
  languages: 'vn',
  startURL: '',
  delayOpenSeconds: 0,
  webRTC: 'real',
  getlocation: 'prompt',
  timeZone: '',
  clientRects: 'off',
  audioContext: 'off',
  fonts: 'off'
}

const profileReducer = (state = initialProfileState, action) => {
  switch (action.type) {
    case UPDATE_USER_PROFILE:
      // Cập nhật state khi thông tin profile được lấy lần đầu
      return {
        ...state,
        ...action.payload
      }
    case CLEAR_USER_PROFILE:
      // Cập nhật state khi người dùng chỉnh sửa thông tin profile
      return {
        ...state,
        initialProfileState
      }
    default:
      return state
  }
}

export default profileReducer
