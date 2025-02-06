import { ComponentProps } from 'react'
import { UserProfileType } from '@shared/models'
import { twMerge } from 'tailwind-merge'
import { useStoreCallback } from '../../redux/callback'
// type ChromeDetailType

export const ChromeDetails = ({ className, ...props }: ComponentProps<'div'>) => {
  const { createUserProfileStateSelector } = useStoreCallback()
  const createUserProfile: UserProfileType = createUserProfileStateSelector
  return (
    <div className={twMerge('flex flex-col gap-4 overflow-hidden', className)} {...props}>
      <h2>Mô tả</h2>
      <ul className="">
        <li>
          <div className="flex justify-between items-start gap-14 w-full ">
            <span>Tên Profile</span>
            <span className="max-w-[100px] text-ellipsis">{createUserProfile.profileName}</span>
          </div>
          <div className="divider"></div>
        </li>
        <li>
          <div className="flex justify-between items-start gap-14 w-full ">
            <span>Browser</span>
            <span className="max-w-[100px] text-ellipsis">{createUserProfile.browser}</span>
          </div>
          <div className="divider"></div>
        </li>
        <li>
          <div className="flex justify-between items-start gap-14 w-full ">
            <span>OS</span>
            <span>{createUserProfile.os}</span>
          </div>
          <div className="divider"></div>
        </li>
        <li>
          <div className="flex justify-between items-start gap-14 w-full ">
            <span>User Agent</span>
            <span className="">{createUserProfile.userAgent}</span>
          </div>
          <div className="divider"></div>
        </li>
        <li>
          <div className="flex justify-between items-start gap-14 w-full ">
            <span>Tỉ lệ màn hình</span>
            <span className="max-w-[100px] text-ellipsis">{createUserProfile.screen}</span>
          </div>
          <div className="divider"></div>
        </li>
        <li>
          <div className="flex justify-between items-start gap-14 w-full ">
            <span>CPU</span>
            <span className="max-w-[100px] text-ellipsis">{createUserProfile.cpu}</span>
          </div>
          <div className="divider"></div>
        </li>
        <li>
          <div className="flex justify-between items-start gap-14 w-full ">
            <span>startURL</span>
            <span className="max-w-[150px] text-ellipsis">{createUserProfile.startURL}</span>
          </div>
          <div className="divider"></div>
        </li>
        <li>
          <div className="flex justify-between items-start gap-14 w-full ">
            <span>Proxy</span>
            <span className="max-w-[100px] text-ellipsis">
              {' '}
              {createUserProfile.proxy?.proxyType ?? ''}{' '}
            </span>
          </div>
          <div className="divider"></div>
        </li>
        <li>
          <div className="flex justify-between items-start gap-14 w-full ">
            <span>WEB RTC</span>
            <span className="max-w-[100px] text-ellipsis">{createUserProfile.webRTC}</span>
          </div>
          <div className="divider"></div>
        </li>
        <li>
          <div className="flex justify-between items-start gap-14 w-full ">
            <span>Timezone</span>
            <span className="max-w-[100px] text-ellipsis"> {createUserProfile.timeZone} </span>
          </div>
          <div className="divider"></div>
        </li>
        <li>
          <div className="flex justify-between items-start gap-14 w-full ">
            <span>Geolocation</span>
            <span className="max-w-[100px] text-ellipsis"> {createUserProfile.getlocation} </span>
          </div>
          <div className="divider"></div>
        </li>
      </ul>
    </div>
  )
}
