import { UserProfileType } from 'src/types'
import { Options } from 'selenium-webdriver/chrome'

import { Builder, WebDriver } from 'selenium-webdriver'

interface CustomInterfaceDriver {
  profileName: string
  webDriver: WebDriver
}
let drivers: CustomInterfaceDriver[] = []

export const closeAllChromeProfile = async () => {
  for (let driver of drivers) {
    await driver.webDriver.quit()
  }
}
export const closeChromeProfile = async (profile: UserProfileType) => {
  for (let driver of drivers) {
    if (driver.profileName === profile.profileName) {
      await driver.webDriver.quit()
    }
  }
}

export const openChromeProfile = async (profile: UserProfileType) => {
  try {
    const options = new Options()
    options.addArguments(
      '--use-gl=swiftshader' // Sử dụng phần mềm SwiftShader thay vì phần cứng GPU
    )
    options.addArguments(`--user-data-dir=${profile.pathSave}`)
    options.addArguments(`--user-agent=${profile.userAgent}`)
    options.addArguments('window-size=400,400') // Đặt kích thước cửa sổ 400x400
    let driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build()
    drivers.push({
      profileName: profile.profileName,
      webDriver: driver
    })
    console.log('TRỜI ƠI NHẢY VÔ ĐÂY DÙM TAO 1 CÁI !!! ')
    await driver.get(profile.startURL != '' ? profile.startURL : 'https://google.com')
    // await driver.wait(() => false)
    console.log('CALL THIS DUM MOT CAI COI ')
    return { isOpen: true, message: 'Mở Chrome Thành Công' }
  } catch (err) {
    console.log('ERR', err)
    return { isOpen: false, message: 'Mở Chrome Thất Bại' }
  }
}
