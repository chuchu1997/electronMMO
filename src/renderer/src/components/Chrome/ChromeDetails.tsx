import { ComponentProps } from 'react'

import { UserProfileType } from 'src/types'
import { twMerge } from 'tailwind-merge'
import { useStoreCallback } from '../../redux/callback'
// type ChromeDetailType

export const ChromeDetails = ({ className, ...props }: ComponentProps<'div'>) => {
  const { userProfileSelector } = useStoreCallback()
  const userBrowserProfile: UserProfileType = userProfileSelector

  return (
    <div className={twMerge('flex flex-col gap-4 overflow-hidden', className)} {...props}>
      <h2>Mô tả</h2>
      <ul className="">
        <li>
          <div className="flex justify-between items-start gap-14 w-full ">
            <span>Tên Profile</span>
            <span className="max-w-[100px] text-ellipsis">{userBrowserProfile.profileName}</span>
          </div>
          <div className="divider"></div>
        </li>
        <li>
          <div className="flex justify-between items-start gap-14 w-full ">
            <span>Browser</span>
            <span className="max-w-[100px] text-ellipsis">{userBrowserProfile.browser}</span>
          </div>
          <div className="divider"></div>
        </li>
        <li>
          <div className="flex justify-between items-start gap-14 w-full ">
            <span>OS</span>
            <span>{userBrowserProfile.os}</span>
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
            <span className="max-w-[100px] text-ellipsis">{userBrowserProfile.screen}</span>
          </div>
          <div className="divider"></div>
        </li>
        <li>
          <div className="flex justify-between items-start gap-14 w-full ">
            <span>CPU</span>
            <span className="max-w-[100px] text-ellipsis">{userBrowserProfile.cpu}</span>
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
            <span className="max-w-[100px] text-ellipsis">
              {' '}
              {userBrowserProfile.proxy?.proxyType ?? ''}{' '}
            </span>
          </div>
          <div className="divider"></div>
        </li>
        <li>
          <div className="flex justify-between items-start gap-14 w-full ">
            <span>WEB RTC</span>
            <span className="max-w-[100px] text-ellipsis">{userBrowserProfile.webRTC}</span>
          </div>
          <div className="divider"></div>
        </li>
        <li>
          <div className="flex justify-between items-start gap-14 w-full ">
            <span>Timezone</span>
            <span className="max-w-[100px] text-ellipsis"> {userBrowserProfile.timeZone} </span>
          </div>
          <div className="divider"></div>
        </li>
        <li>
          <div className="flex justify-between items-start gap-14 w-full ">
            <span>Geolocation</span>
            <span className="max-w-[100px] text-ellipsis"> {userBrowserProfile.getlocation} </span>
          </div>
          <div className="divider"></div>
        </li>
      </ul>
    </div>
  )
}
