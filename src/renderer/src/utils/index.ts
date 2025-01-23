import clsx, { ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

const dateFormatter = new Intl.DateTimeFormat(window.context.locale, {
  dateStyle: 'short',
  timeStyle: 'short',
  timeZone: 'UTC'
})
export const formatDateFromMS = (ms: number) => dateFormatter.format(ms)

export const cn = (...args: ClassValue[]) => {
  return twMerge(clsx(...args))
  //TW MERGE TRANH TRUNG LAP CODE CSS VD tren 1 class (bg-red bg-green =>trung bg twMerge sẽ lấy bg-green vì (vì bg-green nằm ở cuối ) và xóa đi bg-red)
}
