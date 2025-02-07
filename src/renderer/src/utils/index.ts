import clsx, { ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { v4 as uuidv4 } from 'uuid'

const dateFormatter = new Intl.DateTimeFormat('vi-VN', {
  dateStyle: 'short',
  timeStyle: 'short',
  timeZone: 'Asia/Ho_Chi_Minh'
})
export const formatDateFromMS = (ms: number) => dateFormatter.format(ms)

export const cn = (...args: ClassValue[]) => {
  return twMerge(clsx(...args))
  //TW MERGE TRANH TRUNG LAP CODE CSS VD tren 1 class (bg-red bg-green =>trung bg twMerge sẽ lấy bg-green vì (vì bg-green nằm ở cuối ) và xóa đi bg-red)
}

export const generateIDFromUUID = () => {
  return uuidv4()
}
