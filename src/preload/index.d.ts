import { ElectronAPI } from '@electron-toolkit/preload'
import { OpenChromeWithMultipleProfile } from '@shared/types'
declare global {
  interface Window {
    context: {
      openChromeWithMultipleProfile(): OpenChromeWithMultipleProfile
      locale: string
      testFunc(): void
    }
    electron: {
      openChromeProfile: () => void
    }
  }
}
