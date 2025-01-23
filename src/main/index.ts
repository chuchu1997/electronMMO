import { app, shell, BrowserWindow, ipcMain } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
import { OpenChromeWithMultipleProfile } from 'src/renderer/src/shared/types'
import { openChromeWithMultipleProfiles } from './lib'
import { Builder, Capabilities } from 'selenium-webdriver'
import 'chromedriver'
import { Options } from 'selenium-webdriver/chrome'

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
  ipcMain.on('ping', () => console.log('pong'))

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
