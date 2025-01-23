import { contextBridge, ipcRenderer } from 'electron'
import { OpenChromeWithMultipleProfile } from '../renderer/src/shared/types'

// Custom APIs for renderer

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (!process.contextIsolated) {
  throw new Error('contextIsolate must be enabled in the BrowserWindow')
}
try {
  // contextBridge.exposeInMainWorld('context', {
  //   locale: navigator.language,
  //   testFunc: () => {
  //     console.log('CALL THIS ')
  //   },
  //   openChromeWithMultipleProfile: (...args: Parameters<OpenChromeWithMultipleProfile>) =>
  //     ipcRenderer.invoke('openChromeWithMultipleProfile', ...args)
  //   // openChromeWithMultipleProfile: (...args: Parameters<OpenChromeWithMultipleProfile>) =>
  //   //   ipcRenderer.invoke('openChromeWithMultipleProfile', ...args)
  // })
  contextBridge.exposeInMainWorld('electron', {
    openChromeProfile: () => {
      ipcRenderer.send('openChromeProfile')
    }
  })
} catch (err) {
  console.log(err)
}
