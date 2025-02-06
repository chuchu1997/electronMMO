import { UserProfileType } from '../../../../shared/models'
import path from 'path'
import fs from 'fs'
import { Options } from 'selenium-webdriver/chrome'
import { Builder } from 'selenium-webdriver'

export const saveProfileChrome = async (userProfile: UserProfileType) => {
  try {
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
      //   const di
    }
    return profileDir
  } catch (err) {
    console.log('err', err)
  }
}
