// import rootReducer from 'src/renderer/src/redux/reducers/rootReducer'

import rootReducer from '../renderer/src/redux/reducers/rootReducer'

export type ChromeProfile = {
  nameProfile: string

  path: string
  proxy?: string
  proxyUserName?: string
  proxyPassword?: string
  created: number
}

export type RootState = ReturnType<typeof rootReducer>
export type ManageView = 'create-profile' | 'manage-profile' | 'dashboard' | 'manage-proxy'

export type ProxyType = {
  proxyType: 'reverse-proxy' | 'proxy-v4' | 'http-proxy'
  proxyIP?: string
  port?: number
  username?: string
  password?: string
}
export type VersionType = 127 | 128 | 129 | 130
export type UserProfileType = {
  id?: string
  profileName: string
  browser: 'chrome' | 'firefox'
  os: string
  version?: VersionType
  userAgent: string
  screen: string
  cpu: 2 | 4 | 8 | 16 | 32
  languages: 'vn' | 'en'
  startURL: string
  delayOpenSeconds: number
  proxy?: ProxyType
  webRTC: 'foward' | 'foward-google' | 'alter' | 'real' | 'disable'
  getlocation: 'prompt' | 'allow' | 'block'
  timeZone: string
  clientRects: 'noise' | 'off'
  audioContext: 'noise' | 'off'
  fonts: 'noise' | 'off'
  pathSave?: string
  created?: string
  updated?: string
  isRunning?: boolean
}
