import { ElectronAPI } from '@electron-toolkit/preload'
import {
  CloseChromeWithMultipleProfile,
  CloseChromeWithProfile,
  DeleteChromeProfile,
  DeleteMultipleChromeProfile,
  OnCreateProxy,
  OnDeleteProxy,
  OnUpdateProxy,
  OpenChromeWithMultipleProfile,
  OpenChromeWithProfile,
  ReadChromeProfilesFromExcelFile,
  SaveChromeProfile
} from '@shared/types'

import { UserProfileType } from '@shared/models'
declare global {
  interface Window {
    context: {
      openChromeWithMultipleProfile(): OpenChromeWithMultipleProfile
      locale: string
      testFunc(): void
    }
    electron: {
      openChromeWithMultipleProfile: OpenChromeWithMultipleProfile
      openChromeProfile: OpenChromeWithProfile
      closeChromeProfile: CloseChromeWithProfile
      closeChromeWithMultipleProfile: CloseChromeWithMultipleProfile
      saveUserProfile: SaveChromeProfile
      readChromeProfilesFromExcel: ReadChromeProfilesFromExcelFile
      deleteUserChromeProfile: DeleteChromeProfile
      deleteMultipleUserChromeProfile: DeleteMultipleChromeProfile
      //
      onCreateProxy: OnCreateProxy
      onUpdateProxy: OnUpdateProxy
      onDeleteProxy: OnDeleteProxy
    }
  }
}
export {}
