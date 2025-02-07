import XLSX from 'xlsx'
import path from 'path'
import fs from 'fs'
import { UserProfileType } from '@shared/models'
import {
  DeleteMultipleProfileChromeFolder,
  DeleteProfileChromeFolder,
  saveProfileChrome
} from '../chromeHandler/chromeAction'
import { closeChromeProfile, closeChromeWithMultipleProfile } from '../chromeHandler'
let wb
let ws
export const ReadAndGetUserProfilesFromExcel = (excelPath: string, sheet: string) => {
  let data: UserProfileType[] = []
  let isOK = false

  if (fs.existsSync(excelPath)) {
    //FILE TỒN TẠI

    wb = XLSX.readFile(excelPath)
    ws = wb.Sheets[sheet]
    data = XLSX.utils.sheet_to_json(ws)
    isOK = true
  }
  //IF DATA LENGTH == 0
  return { isOK, data }
}

export const GetAllUserProfileFromExcelFile = () => {
  console.log('CALL THIS !!')
  const directory = path.join(__dirname, '../../db')
  const excelPath = path.join(directory, 'information.xlsx')

  let result = ReadAndGetUserProfilesFromExcel(excelPath, 'Profiles')
  if (result.isOK) {
    return { profiles: result.data, status: 200 }
  }
}
export const DeleteMultipleUserProfileFromExcelFile = async (profiles: UserProfileType[]) => {
  console.log('CALL VAO DAY NAY ~~')
  try {
    const directory = path.join(__dirname, '../../db')
    const excelPath = path.join(directory, 'information.xlsx')
    let result = await ReadAndGetUserProfilesFromExcel(excelPath, 'Profiles')
    if (result.isOK) {
      let data: UserProfileType[] = result.data
      for (let i = 0; i < profiles.length; i++) {
        let index = data.findIndex((profile) => profile.id === profiles[i].id)
        if (index != -1) {
          data.splice(index, 1)
        }
      }
      ws = XLSX.utils.json_to_sheet(data)
      wb.Sheets['Profiles'] = ws
      XLSX.writeFile(wb, excelPath)
      await closeChromeWithMultipleProfile(profiles).then(async () => {
        await DeleteMultipleProfileChromeFolder(profiles)
      })
    }
    return { status: 200, message: 'Xóa nhiều profile thành công' }
  } catch (err) {
    return { status: 404, message: 'Xóa nhiều profile không thành công' }
  }
}
export const DeleteUserProfileFromExcelFile = async (profile: UserProfileType) => {
  try {
    const directory = path.join(__dirname, '../../db')
    const excelPath = path.join(directory, 'information.xlsx')

    let result = await ReadAndGetUserProfilesFromExcel(excelPath, 'Profiles')
    if (result.isOK) {
      let data: UserProfileType[] = result.data
      let index = data.findIndex((dataProfile) => dataProfile.id === profile.id)
      data.splice(index, 1)

      ws = XLSX.utils.json_to_sheet(data)
      wb.Sheets['Profiles'] = ws
      XLSX.writeFile(wb, excelPath)

      await closeChromeProfile(profile).then(async () => {
        await DeleteProfileChromeFolder(profile)
      })
    }
    return { status: 200, message: 'Xóa thành công ' }
  } catch (err) {
    return { status: 404, message: 'Xóa không thành công' }
  }
}
export const WriteUserProfileToExcelFile = async (sheet: string, profile: UserProfileType) => {
  try {
    const directory = path.join(__dirname, '../../db')
    const excelPath = path.join(directory, 'information.xlsx')
    if (!fs.existsSync(excelPath)) {
      await CreateExcelFile(sheet, 'information.xlsx')
    }

    let pathProfile = await saveProfileChrome(profile)
    let result = ReadAndGetUserProfilesFromExcel(excelPath, sheet)
    profile.pathSave = pathProfile
    if (result.isOK) {
      let data: UserProfileType[] = result.data
      data.push({ ...profile, pathSave: pathProfile })
      ws = XLSX.utils.json_to_sheet(data)
      wb.Sheets[sheet] = ws
      XLSX.writeFile(wb, excelPath)

      return { success: true, message: 'Tạo user profile thành công', profileCreated: profile }
    }
  } catch (err) {
    return {
      success: false,
      message: 'Vui lòng không mở file excel khi tiến hành lưu !!!',
      profileCreated: null
    }
  }
}
export const CreateExcelFile = (sheet: string, fileName: string, folderPath?: string) => {
  const directory = folderPath ?? path.join(__dirname, '../../db')
  if (!fs.existsSync(directory)) {
    // CHƯA CÓ FOLDER !! TẠO MỚI 1 FOLDER
    fs.mkdirSync(directory, { recursive: true })
  }
  let excelPath = path.join(directory, fileName)
  try {
    if (!fs.existsSync(excelPath)) {
      //NẾU FILE CHƯA TỒN TẠI THÌ TIẾN HÀNH TẠO !!
      wb = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(wb, ws, sheet)
      XLSX.writeFile(wb, excelPath)
    }

    return excelPath
  } catch (err) {
    console.log('Có lỗi xảy ra ', err)
    return err
  }
}
