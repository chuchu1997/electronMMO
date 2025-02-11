import { contextBridge, ipcRenderer } from 'electron'
import { ProxyType, UserProfileType } from '@shared/models'

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
      return await ipcRenderer.invoke('openChromeWithMultipleProfile', profiles)
    },
    deleteUserChromeProfile: async (profile: UserProfileType) => {
      return await ipcRenderer.invoke('deleteUserChromeProfile', profile)
    },
    deleteMultipleUserChromeProfile: async (profiles: UserProfileType[]) => {
      return await ipcRenderer.invoke('deleteMultipleUserChromeProfile', profiles)
    },
    /// Proxy Handler
    onCreateProxy: async (proxyInfo: ProxyType) => {
      return await ipcRenderer.invoke('onCreateProxy', proxyInfo)
      // return proxyInfo
    },
    onDeleteProxy: async (id: string) => {
      return await ipcRenderer.invoke('onDeleteProxy', id)
    }
  })
} catch (err) {
  err
}
