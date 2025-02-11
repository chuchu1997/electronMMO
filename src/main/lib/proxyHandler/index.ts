import { ProxyType } from '@shared/models'
import { v4 as uuidv4 } from 'uuid'

import path from 'path'
import fs from 'fs'
import { ensurePathExist } from '../FileReaderHandler'
import XLSX from 'xlsx'
let directoryPath = path.join(__dirname, '../../proxy')
let proxyFileName = 'proxyInfo'
let proxyFilePath = `${directoryPath}/${proxyFileName}.xlsx`
let sheet = 'ProxyInfo'
let wb
let ws
export const OnCreateProxyHandler = async (proxyInfo: ProxyType) => {
  try {
    let data: ProxyType[] = []
    await ensurePathExist(directoryPath)
    if (!fs.existsSync(proxyFilePath)) {
      //CREATE NEW PROXY FILE (EXCEL)
      //   XLSX.utils.book_append_sheet(wb, ws, sheet)
      wb = XLSX.utils.book_new()
      data = [{ ...proxyInfo, id: uuidv4() }]
      ws = XLSX.utils.json_to_sheet(data)
      XLSX.utils.book_append_sheet(wb, ws, sheet)
      XLSX.writeFile(wb, proxyFilePath)

      // XLSX.writeFile
    } else {
      let result = await getAllProxyFromExcelFile(proxyFilePath)
      if (result.isOK) {
        data = result.data
        data.push({ ...proxyInfo, id: uuidv4() })
        ws = XLSX.utils.json_to_sheet(data)
        wb.Sheets[sheet] = ws
        // XLSX.utils.book_append_sheet(wb, ws, sheet)
        XLSX.writeFile(wb, proxyFilePath)
      }
    }
    return { status: 200, message: 'Tạo proxy  thành công', proxys: data }
  } catch (err) {
    console.log('ERROR !!!', err)
    return { status: 404, message: 'Tạo proxy không thành công', proxys: [] }
  }
}
export const getAllProxyFromExcelFile = async (pathExcelFile) => {
  let isOK = false
  let data: ProxyType[] = []

  if (fs.existsSync(pathExcelFile)) {
    wb = XLSX.readFile(pathExcelFile)
    ws = wb.Sheets[sheet]
    data = XLSX.utils.sheet_to_json(ws)
    isOK = true
  }
  return { isOK, data }
}
export const OnUpdateProxyHandler = (proxyInfo: ProxyType) => {
  //   try {
  //     if (!fs.existsSync(excelPath)) {
  //       //NẾU FILE CHƯA TỒN TẠI THÌ TIẾN HÀNH TẠO !!
  //       wb = XLSX.utils.book_new()
  //       XLSX.utils.book_append_sheet(wb, ws, sheet)
  //       XLSX.writeFile(wb, excelPath)
  //     }
  //     return excelPath
  //   } catch (err) {
  //     console.log('ERR', err)
  //     return err
  //   }
}
export const OnDeleteProxyHandler = async (id: string) => {
  try {
    if (fs.existsSync(proxyFilePath)) {
      let result = await getAllProxyFromExcelFile(proxyFilePath)
      if (result.isOK) {
        let data: ProxyType[] = result.data
        let index = data.findIndex((proxy) => proxy.id === id)
        if (index != -1) data.splice(index, 1)
        ws = XLSX.utils.json_to_sheet(data)
        wb.Sheets[sheet] = ws
        XLSX.writeFile(wb, proxyFilePath)
      }
    }
    return { status: 404, message: 'Xóa proxy thành công' }
  } catch (err) {
    return { status: 404, message: 'Xóa proxy thất bại' }
  }
}
