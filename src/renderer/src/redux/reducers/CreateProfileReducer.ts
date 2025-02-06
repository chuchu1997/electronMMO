import { UserProfileType } from 'src/types'
import { formatDateFromMS } from '../../utils'
import { CLEAR_CREATE_USER_PROFILE, UPDATE_CREATE_USER_PROFILE } from '../actions'

const initialProfileState: UserProfileType = {
  profileName: '',
  browser: 'chrome',
  os: '',
  version: 130,
  userAgent: '',
  screen: '1920x1080',
  cpu: 4,
  languages: 'vn',
  startURL: '',
  delayOpenSeconds: 0,
  webRTC: 'real',
  getlocation: 'prompt',
  timeZone: '',
  clientRects: 'off',
  audioContext: 'off',
  fonts: 'off',
  proxy: {
    proxyType: 'HTTP Proxy',
    proxyIP: '',
    port: 0,
    username: '',
    password: ''
  },
  isRunning: false,
  created: formatDateFromMS(Date.now())
}

export const createProfileReducer = (state = initialProfileState, action) => {
  switch (action.type) {
    case UPDATE_CREATE_USER_PROFILE:
      return { ...state, ...action.payload }
    case CLEAR_CREATE_USER_PROFILE:
      return { ...state, initialProfileState }
    default:
      return state
  }
}
