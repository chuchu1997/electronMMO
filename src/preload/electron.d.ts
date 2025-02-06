import { ElectronAPI } from '@electron-toolkit/preload'
import { OpenChromeWithMultipleProfile } from '@shared/types'
import { UserProfileType } from 'src/types'
declare global {
  interface Window {
    context: {
      openChromeWithMultipleProfile(): OpenChromeWithMultipleProfile
      locale: string
      testFunc(): void
    }
    electron: {
      openChromeWithMultipleProfile: (profiles: UserProfileType[]) => {
        profilesOpen: UserProfileType[]
        message
      }
      openChromeProfile: (profile: UserProfileType) => { isOpen; message }
      closeChromeProfile: (profile: UserProfileType) => { isOpen; message }
      closeChromeWithMultipleProfile: (profiles: UserProfileType[]) => {
        profilesClose: UserProfileType[]
        message
      }
      saveUserProfile: (userProfile: UserProfileType) => { success; message }
      readChromeProfilesFromExcel: () => { profiles: UserProfileType[]; status }
    }
  }
}
export {}
