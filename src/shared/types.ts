import { ProxyType, UserProfileType } from './models'

///SHARE fOLDER (Dùng để define các hàm , mã nguồn chia sẽ dùng chung giữa Main và Render Process !!!)
export type OpenChromeWithMultipleProfile = (profiles: UserProfileType[]) => {
  profilesOpen: UserProfileType[]
  message
}
export type CloseChromeWithMultipleProfile = (profiles: UserProfileType[]) => {
  profilesClose: UserProfileType[]
  message
}
export type CloseChromeWithProfile = (profile: UserProfileType) => { isOpen; message }
export type OpenChromeWithProfile = (profile: UserProfileType) => { isOpen; message }
export type SaveChromeProfile = (userProfile: UserProfileType) => {
  success
  message
  profileCreated
}
export type DeleteChromeProfile = (userProfile: UserProfileType) => {
  status
  message
}
export type DeleteMultipleChromeProfile = (profiles: UserProfileType[]) => {
  status
  message
}
export type ReadChromeProfilesFromExcelFile = () => { profiles: UserProfileType[]; status }

//PROXY HANDLER
export type OnReadAllProxy = () => {}
export type OnCreateProxy = (proxyInfo: ProxyType) => {
  status
  message
  proxys
}
export type OnUpdateProxy = (proxyInfo: ProxyType) => {}
export type OnDeleteProxy = (idProxy: string) => {
  status
  message
}
//PROXY HANDLER
