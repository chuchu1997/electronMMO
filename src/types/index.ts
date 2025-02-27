import rootReducer from 'src/renderer/src/redux/reducers/rootReducer'

export type RootState = ReturnType<typeof rootReducer>
export type ManageView = {
  view: 'create-profile' | 'manage-profile' | 'dashboard'
}

export type ProxyType = {
  proxyType: string
  proxyIP?: string
  port?: number
  username?: string
  password?: string
}
export type UserProfileType = {
  profileName: string
  browser: 'chrome' | 'firefox'
  os: string
  version: 127 | 128 | 129 | 130
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
