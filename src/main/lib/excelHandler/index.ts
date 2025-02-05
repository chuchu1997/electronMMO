import XLSX from 'xlsx'
import path from 'path'
import fs from 'fs'
import { UserProfileType } from 'src/types'
import { saveProfileChrome } from '../chromeHandler/chromeAction'
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
export const WriteUserProfileToExcelFile = async (sheet: string, profile: UserProfileType) => {
  console.log('CÓ GỌI NÈ !!')
  try {
    const directory = path.join(__dirname, '../../db')
    const excelPath = path.join(directory, 'information.xlsx')
    if (!fs.existsSync(excelPath)) {
      await CreateExcelFile(sheet, 'information.xlsx')
    }

    let pathProfile = await saveProfileChrome(profile)
    let result = ReadAndGetUserProfilesFromExcel(excelPath, sheet)

    if (result.isOK) {
      let data: UserProfileType[] = result.data
      data.push({ ...profile, pathSave: pathProfile })
      ws = XLSX.utils.json_to_sheet(data)
      wb.Sheets[sheet] = ws
      XLSX.writeFile(wb, excelPath)
      console.log('CALL CALL !!')
      return { success: true, message: 'Tạo user profile thành công' }
    }
  } catch (err) {
    return { success: false, message: 'Vui lòng không mở file excel khi tiến hành lưu !!!' }
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
