import { ComponentProps } from 'react'
import { useSelector } from 'react-redux'
import { RootState, UserProfileType } from 'src/types'
import { twMerge } from 'tailwind-merge'

// type ChromeDetailType
export interface ChromeDetailsType extends ComponentProps<'div'> {
  profileName?: string
  browser?: string
  screenResolution?: string
  webRTC?: string
  OS?: string
  userAgent?: string
}

export const ChromeDetails = ({
  className,
  profileName,
  browser,
  screenResolution,
  OS,
  userAgent,
  ...props
}: ChromeDetailsType) => {
  const userBrowserProfile: UserProfileType = useSelector((state: RootState) => state.userProfile)

  return (
    <div className={twMerge('flex flex-col gap-4 overflow-hidden', className)} {...props}>
      <h2>Mô tả</h2>
      <ul className="">
        <li>
          <div className="flex justify-between items-start gap-14 w-full ">
            <span>Tên Profile</span>
            <span className="max-w-[100px] text-ellipsis">{profileName}</span>
          </div>
          <div className="divider"></div>
        </li>
        <li>
          <div className="flex justify-between items-start gap-14 w-full ">
            <span>Browser</span>
            <span className="max-w-[100px] text-ellipsis">{browser}</span>
          </div>
          <div className="divider"></div>
        </li>
        <li>
          <div className="flex justify-between items-start gap-14 w-full ">
            <span>OS</span>
            <span>{OS}</span>
          </div>
          <div className="divider"></div>
        </li>
        <li>
          <div className="flex justify-between items-start gap-14 w-full ">
            <span>User Agent</span>
            <span className="">{userBrowserProfile.userAgent}</span>
          </div>
          <div className="divider"></div>
        </li>
        <li>
          <div className="flex justify-between items-start gap-14 w-full ">
            <span>Tỉ lệ màn hình</span>
            <span className="max-w-[100px] text-ellipsis">1920x1080</span>
          </div>
          <div className="divider"></div>
        </li>
        <li>
          <div className="flex justify-between items-start gap-14 w-full ">
            <span>CPU</span>
            <span className="max-w-[100px] text-ellipsis">1</span>
          </div>
          <div className="divider"></div>
        </li>
        <li>
          <div className="flex justify-between items-start gap-14 w-full ">
            <span>startURL</span>
            <span className="max-w-[150px] text-ellipsis">{userBrowserProfile.startURL}</span>
          </div>
          <div className="divider"></div>
        </li>
        <li>
          <div className="flex justify-between items-start gap-14 w-full ">
            <span>Proxy</span>
            <span className="max-w-[100px] text-ellipsis">1</span>
          </div>
          <div className="divider"></div>
        </li>
        <li>
          <div className="flex justify-between items-start gap-14 w-full ">
            <span>WEB RTC</span>
            <span className="max-w-[100px] text-ellipsis">1</span>
          </div>
          <div className="divider"></div>
        </li>
        <li>
          <div className="flex justify-between items-start gap-14 w-full ">
            <span>Timezone</span>
            <span className="max-w-[100px] text-ellipsis">1</span>
          </div>
          <div className="divider"></div>
        </li>
        <li>
          <div className="flex justify-between items-start gap-14 w-full ">
            <span>Geolocation</span>
            <span className="max-w-[100px] text-ellipsis">1</span>
          </div>
          <div className="divider"></div>
        </li>

        <li>
          <div className="flex justify-between items-start gap-14 w-full ">
            <span>WebGL</span>
            <span className="max-w-[100px] text-ellipsis">1</span>
          </div>
          <div className="divider"></div>
        </li>

        <li>
          <div className="flex justify-between items-start gap-14 w-full ">
            <span>WebGL Vendor</span>
            <span className="max-w-[100px] text-ellipsis">1</span>
          </div>
          <div className="divider"></div>
        </li>
      </ul>
    </div>
  )
}
