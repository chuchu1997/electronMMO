import { app, shell, BrowserWindow, ipcMain } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
import { OpenChromeWithMultipleProfile } from 'src/renderer/src/shared/types'
import { openChromeWithMultipleProfiles } from './lib'
import { Builder, Capabilities } from 'selenium-webdriver'
import 'chromedriver'
import { Options } from 'selenium-webdriver/chrome'
import XLSX from 'xlsx'
import path from 'path'
import fs from 'fs'
import { UserProfileType } from '../types'
let listDriver = []

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

  async function openChromeProfile() {
    try {
      // const options = new Options()
      // options.addArguments(
      //   '--headless', // Chạy Chrome mà không có giao diện người dùng
      //   '--disable-gpu', // Tắt GPU acceleration (nếu có)
      //   '--no-sandbox', // Không sử dụng sandbox (chạy với quyền hạn cao)
      //   '--incognito', // Chạy trình duyệt ở chế độ ẩn danh
      //   '--start-maximized' // Khởi động Chrome ở chế độ cửa sổ lớn
      // )
      const options = new Options()
      options.addArguments(
        '--use-gl=swiftshader' // Sử dụng phần mềm SwiftShader thay vì phần cứng GPU
      )
      // const userAgent =
      //   'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      // options.addArguments(`--user-agent=${userAgent}`)

      // Tạo và khởi tạo trình điều khiển Selenium WebDriver cho Chrome
      let driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build()

      await driver.get('https://www.google.com')
      await driver.wait(() => false)
    } catch (err) {
      console.log('Có lỗi xảy ra khi mở chrome !!')
    }
  }
  ipcMain.handle('saveProxys', async (event, proxyInfo: any) => {
    //HANDLE FOR PROXY !!!
  })

  async function saveChromeProfiles(userProfile: UserProfileType) {
    const profileDir = path.join(__dirname, `../../chromeProfile/${userProfile.profileName}`)
    if (!fs.existsSync(profileDir)) {
      fs.mkdirSync(profileDir, { recursive: true })

      const options = new Options()
      options.addArguments(`user-data-dir=${profileDir}`)
      options.addArguments('--headless') // Chạy ở chế độ không giao diện người dùng
      options.addArguments('--disable-gpu') // Tắt GPU nếu không cần thiết
      options.addArguments(`profile-directory=${userProfile.profileName}`)

      let driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build()
      driver.close()
    }
    return profileDir
  }
  ipcMain.handle('saveUserProfile', async (event, userProfile: UserProfileType) => {
    let pathSave = await saveChromeProfiles(userProfile)
    console.log('PATH SAVE', pathSave)
    let wb
    let ws
    const directoryPath = path.join(__dirname, '../../db')

    if (!fs.existsSync(directoryPath)) {
      fs.mkdirSync(directoryPath, { recursive: true })
    }
    const excelFilePath = path.join(directoryPath, 'information.xlsx')

    try {
      if (fs.existsSync(excelFilePath)) {
        // Nếu file tồn tại, đọc file Excel hiện tại
        wb = XLSX.readFile(excelFilePath)
        ws = wb.Sheets['Profiles']
      } else {
        // Nếu không tồn tại, tạo một workbook mới và thêm sheet 'Profiles'
        wb = XLSX.utils.book_new()
        // Tạo sheet với các header 'Name', 'Age', 'Status'
        ws = XLSX.utils.json_to_sheet([
          [
            {
              Name: 'User Profile (Gmail)',
              Proxy: 'Proxy',
              Agent: 'Agent',
              StartURL: 'StartURL',
              Screen: 'Screen',
              ChromeVersion: 'ChromeVersion',
              Delay: 'Delay',
              Created: 'Created',
              Updated: 'Updated',
              Path: 'Path'
            }
          ]
        ])
        XLSX.utils.book_append_sheet(wb, ws, 'Profiles')
        // Lưu lại workbook vào file Excel
        XLSX.writeFile(wb, excelFilePath)
      }
      // userProfile.p

      const data = XLSX.utils.sheet_to_json(ws)
      data.push({
        Name: userProfile.profileName,
        Proxy: userProfile.proxy?.proxyIP ?? '',
        Agent: userProfile.userAgent,
        StartURL: userProfile.startURL,
        ChromeVersion: userProfile.version,
        Delay: userProfile.delayOpenSeconds,
        Created: userProfile.created,
        Path: pathSave
      })

      ws = XLSX.utils.json_to_sheet(data)

      wb.Sheets['Profiles'] = ws // Cập nhật sheet trong workbook
      // Ghi lại file Excel
      XLSX.writeFile(wb, excelFilePath)
      return { success: true, message: 'Tạo user profile thành công' }
    } catch (err) {
      return { success: false, message: 'Vui lòng không mở file excel khi tiến hành lưu !!!' }
    }

    // Kiểm tra xem file Excel đã tồn tại chưa
  })
  ipcMain.on('openChromeProfile', () => {
    openChromeProfile()
    // openChromeProfile()
  })
  ipcMain.on('onCreateSyncAction', () => {})

  ipcMain.on('createWebSocket', () => {})

  ipcMain.handle(
    'openChromeWithMultipleProfile',
    (_, ...args: Parameters<OpenChromeWithMultipleProfile>) =>
      openChromeWithMultipleProfiles(...args)
  )

  // ipcMain.handle('openChromeWithMultipleProfile')

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
