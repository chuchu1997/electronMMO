// import { UserProfileType } from '@/shared/models'

import { Options } from 'selenium-webdriver/chrome'

import { Builder, WebDriver } from 'selenium-webdriver'

import { UserProfileType } from '@shared/models'
interface CustomInterfaceDriver {
  profileName: string
  webDriver: WebDriver
}
let drivers: CustomInterfaceDriver[] = []

export const closeAllChromeProfile = async () => {
  for (let driver of drivers) {
    await driver.webDriver.quit()
  }
  drivers = []
}
export const closeChromeProfile = async (profile: UserProfileType) => {
  for (let driver of drivers) {
    if (driver.profileName === profile.profileName) {
      await driver.webDriver.quit()

      let index = drivers.findIndex((d) => d.profileName === profile.profileName)
      if (index !== -1) {
        drivers.splice(index, 1)
      }
    }
  }
  return { isOpen: false, message: 'Tắt Chrome Thành Công ' }
}

export const closeChromeWithMultipleProfile = async (profiles: UserProfileType[]) => {
  let profilesClose: UserProfileType[] = []
  try {
    for (let profile of profiles) {
      if (profile.isRunning) {
        //Chỉ xử lý với profile đang chạy
        for (let driver of drivers) {
          if (driver.profileName == profile.profileName) {
            await driver.webDriver.quit()
            let index = drivers.findIndex((d) => d.profileName === profile.profileName)
            if (index !== -1) {
              drivers.splice(index, 1)
            }
          }
          profile.isRunning = false

          profilesClose.push(profile)
        }
      }
    }

    return { profilesClose, message: 'Đã đóng nhiều profile thành công !!' }
  } catch (err) {
    return { profilesClose: [], message: 'Có lỗi xảy ra khi đóng nhiều profile !!' }
  }
}

export const openChromeWithMultipleProfile = async (profiles: UserProfileType[]) => {
  try {
    // const options
    let profilesOpen: UserProfileType[] = []

    for (let profile of profiles) {
      if (!drivers.some((driver) => driver.profileName == profile.profileName)) {
        let options = new Options()
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
        profile.isRunning = true
        profilesOpen.push(profile)
        await driver.get(profile.startURL != '' ? profile.startURL : 'https://google.com')
        // await driver.wait(() => false)
      }
    }

    return { profilesOpen, message: 'Mở thành công' }
  } catch (err) {
    return { profilesOpen: [], message: 'Lỗi khi mở nhiều profile ' }
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

    await driver.get(profile.startURL != '' ? profile.startURL : 'https://google.com')
    // await driver.wait(() => false)

    return { isOpen: true, message: 'Mở Chrome Thành Công' }
  } catch (err) {
    console.log('ERR', err)
    return { isOpen: false, message: 'Mở Chrome Thất Bại' }
  }
}
