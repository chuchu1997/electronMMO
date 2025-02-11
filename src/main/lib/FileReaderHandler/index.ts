import fs from 'fs'
import path from 'path'
import XLSX from 'xlsx'
export const ensurePathExist = async (targetPath) => {
  if (!fs.existsSync(targetPath)) {
    // NẾU ĐƯỜNG DẪN TỚI CHƯA CÓ FOLDER NÀY THÌ TIẾN HÀNH TẠO
    fs.mkdirSync(targetPath, { recursive: true })
  }
}
