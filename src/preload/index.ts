import { contextBridge, ipcRenderer } from 'electron'
import { OpenChromeWithMultipleProfile } from '../renderer/src/shared/types'
import { UserProfileType } from '../types'

if (!process.contextIsolated) {
  throw new Error('contextIsolate must be enabled in the BrowserWindow')
}
try {
  contextBridge.exposeInMainWorld('electron', {
    openChromeProfile: (profile: UserProfileType) => {
      return ipcRenderer.invoke('openChromeProfile', profile)
    },
    closeChromeProfile: (profile: UserProfileType) => {
      return ipcRenderer.invoke('closeChromeProfile', profile)
    },
    closeChromeWithMultipleProfile: (profiles: UserProfileType[]) => {
      return ipcRenderer.invoke('closeChromeWithMultipleProfile', profiles)
    },
    saveUserProfile: async (userProfile: UserProfileType) => {
      return await ipcRenderer.invoke('saveUserProfile', userProfile)
    },

    readChromeProfilesFromExcel: async () => {
      return await ipcRenderer.invoke('readChromeProfilesFromExcel')
    },
    openChromeWithMultipleProfile: async (profiles: UserProfileType[]) => {
      console.log('CALL CALL')
      return await ipcRenderer.invoke('openChromeWithMultipleProfile', profiles)
    }
  })
} catch (err) {
  console.log(err)
}
