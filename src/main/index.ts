import { app, shell, BrowserWindow, ipcMain, dialog } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'

import {
  closeAllChromeProfile,
  closeChromeProfile,
  closeChromeWithMultipleProfile,
  openChromeProfile,
  openChromeWithMultipleProfile,
  WriteUserProfileToExcelFile,
  GetAllUserProfileFromExcelFile
} from './lib'
import { Builder, Capabilities, WebDriver } from 'selenium-webdriver'
import 'chromedriver'
import { Options } from 'selenium-webdriver/chrome'
import XLSX from 'xlsx'
import path from 'path'
import fs from 'fs'
// import { UserProfileType } from '@shared/models'
import process from 'process'
import { saveProfileChrome } from './lib/chromeHandler/chromeAction'
// import {
//   OpenChromeWithProfile,
//   OpenChromeWithMultipleProfile,
//   CloseChromeWithProfile,
//   CloseChromeWithMultipleProfile,
//   SaveChromeProfile
// } from '@shared/type'

import {
  CloseChromeWithMultipleProfile,
  CloseChromeWithProfile,
  OpenChromeWithMultipleProfile,
  OpenChromeWithProfile,
  ReadChromeProfilesFromExcelFile,
  SaveChromeProfile
} from '@shared/types'

interface CustomInterfaceDriver {
  profileName: string
  webDriver: WebDriver
}
let drivers: CustomInterfaceDriver[] = []
function createWindow(): void {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    autoHideMenuBar: true,
    //HIDE MENUBAR
    ...(process.platform === 'linux' ? { icon } : {}),
    center: true,
    title: 'NoteMark',
    // frame: false,
    // vibrancy: 'under-window',
    // visualEffectState: 'active',
    // titleBarStyle: 'hidden',
    trafficLightPosition: { x: 15, y: 10 },
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: true,
      contextIsolation: true
    }
  })

  mainWindow.on('close', (event) => {
    event.preventDefault()
    dialog
      .showMessageBox(mainWindow, {
        type: 'question',
        buttons: ['Yes', 'No'],
        title: 'Confirm Exit',
        message: 'Bạn muốn thoát chương trình ? (Chromes sẽ bị đóng tất cả )'
      })
      .then(async (result) => {
        if (result.response === 0) {
          await closeAllChromeProfile()

          mainWindow.destroy()
        }
      })
  })
  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }

  // import chrome from 'selenium-webdriver/chrome'
  // import { Builder } from 'selenium-webdriver'
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  // IPC test
  ipcMain.on('ping', () => console.log('ping'))

  ipcMain.handle('saveProxys', async (_, proxyInfo: any) => {
    //HANDLE FOR PROXY !!!
  })

  // ipcMain.handle('readChromeProfilesFromExcel', async () => {
  //   let wb
  //   let ws
  //   const directoryPath = path.join(__dirname, '../../db')

  //   if (!fs.existsSync(directoryPath)) {
  //     fs.mkdirSync(directoryPath, { recursive: true })
  //   }
  //   const excelFilePath = path.join(directoryPath, 'information.xlsx')

  //   try {
  //     if (fs.existsSync(excelFilePath)) {
  //       // Nếu file tồn tại, đọc file Excel hiện tại
  //       wb = XLSX.readFile(excelFilePath)
  //       ws = wb.Sheets['Profiles']
  //       console.log('FILE EXCEL DA CO !!')
  //     } else {
  //       console.log('khongh co file !!')
  //       return { profiles: null, status: 404 }
  //     }

  //     const data: UserProfileType[] = XLSX.utils.sheet_to_json(ws)

  //     return { profiles: data, status: 200 }
  //   } catch (err) {
  //     return { profile: null, status: 404 }
  //   }
  // })
  // ipcMain.handle('')

  // ipcMain.handle('readChromeProfilesFromExcel',(_,...args:Parameters<ReadChromeProfilesFromExcelFile>)=>

  // )
  ipcMain.handle('readChromeProfilesFromExcel', (_) => GetAllUserProfileFromExcelFile())

  ipcMain.handle('openChromeProfile', (_, ...args: Parameters<OpenChromeWithProfile>) =>
    openChromeProfile(...args)
  )
  ipcMain.handle(
    'openChromeWithMultipleProfile',
    (_, ...args: Parameters<OpenChromeWithMultipleProfile>) =>
      openChromeWithMultipleProfile(...args)
  )

  ipcMain.handle('closeChromeProfile', (_, ...args: Parameters<CloseChromeWithProfile>) =>
    closeChromeProfile(...args)
  )
  ipcMain.handle(
    'closeChromeWithMultipleProfile',
    (_, ...args: Parameters<CloseChromeWithMultipleProfile>) =>
      closeChromeWithMultipleProfile(...args)
  )
  ipcMain.handle('saveUserProfile', (_, ...args: Parameters<SaveChromeProfile>) => {
    return WriteUserProfileToExcelFile('Profiles', ...args)
  })

  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
