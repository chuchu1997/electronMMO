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
    saveUserProfile: async (userProfile: UserProfileType) => {
      return await ipcRenderer.invoke('saveUserProfile', userProfile)
    },

    readChromeProfilesFromExcel: async () => {
      return await ipcRenderer.invoke('readChromeProfilesFromExcel')
    }
  })
} catch (err) {
  console.log(err)
}
