// import { UserProfileType } from '@/shared/models'

import { Options } from 'selenium-webdriver/chrome'

import { Builder, WebDriver } from 'selenium-webdriver'

import { UserProfileType } from '@shared/models'
import { GetAllUserProfileFromExcelFile } from '@/lib/excelHandler'
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

    let screenWidth = 1920
    let screenHeight = 1080

    let cols = 4
    let rows = 2
    let gap = 20

    for (let profile of profiles) {
      if (
        !drivers.some((driver) => driver.profileName == profile.profileName && !profile.isRunning)
      ) {
        let options = new Options()
        options.addArguments(
          '--use-gl=swiftshader' // Sử dụng phần mềm SwiftShader thay vì phần cứng GPU
        )

        let dimenstions = profile.screen.split('x')
        let width = dimenstions[0]
        let height = dimenstions[1]

        options.addArguments(`--user-data-dir=${profile.pathSave}`)
        options.addArguments(`--user-agent=${profile.userAgent}`)
        // options.addArguments(`window-size=50,${height}`)

        let driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build()
        drivers.push({
          profileName: profile.profileName,
          webDriver: driver
        })
        profile.isRunning = true
        profilesOpen.push(profile)
        await driver.get(profile.startURL != '' ? profile.startURL : 'https://google.com')

        let windowWidth = screenWidth / cols

        let windowHeight = screenHeight / rows

        let index = profilesOpen.indexOf(profile)
        let row = Math.floor(index / cols)

        let col = index % cols

        let xPOS = col * windowWidth

        let yPOS = row * windowHeight + gap / 2

        await driver.manage().window().setRect({
          width: windowWidth,
          height: windowHeight,
          x: xPOS,
          y: yPOS
        })

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
    let dimenstions = profile.screen.split('x')
    let width = dimenstions[0]
    let height = dimenstions[1]

    options.addArguments(`window-size=${width},${height}`) // Đặt kích thước cửa sổ 400x400
    let driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build()
    drivers.push({
      profileName: profile.profileName,
      webDriver: driver
    })

    await driver.get(profile.startURL != '' ? profile.startURL : 'https://google.com')
    // await driver.wait(() => false)

    return { isOpen: true, message: 'Mở Chrome Thành Công' }
  } catch (err) {
    'ERR', err
    return { isOpen: false, message: 'Mở Chrome Thất Bại' }
  }
}
