import { contextBridge, ipcRenderer } from 'electron'
import { OpenChromeWithMultipleProfile } from '../renderer/src/shared/types'
import { UserProfileType } from '../types'

if (!process.contextIsolated) {
  throw new Error('contextIsolate must be enabled in the BrowserWindow')
}
try {
  contextBridge.exposeInMainWorld('electron', {
    openChromeProfile: () => {
      ipcRenderer.send('openChromeProfile')
    },
    saveUserProfile: async (userProfile: UserProfileType) => {
      return await ipcRenderer.invoke('saveUserProfile', userProfile)
    }
  })
} catch (err) {
  console.log(err)
}
