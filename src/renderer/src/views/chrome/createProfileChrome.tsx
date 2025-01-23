import { LuPlus, LuUser } from 'react-icons/lu'
import {
  ActionButton,
  ChromeDetails,
  ChromeDetailsType,
  ChromeCreateProfileTabs,
  InputComponent
} from '../../components'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState, UserProfileType } from 'src/types'
import { updateUserProfile } from '../../redux/actions'

export const CreateProfileChromeView = () => {
  function getRandomUserAgent() {
    // let browsers = ['Chrome']
    // let osList = ['Windows NT 10.0', 'Windows NT 6.1']
    // let browserVersions = [
    //   '91.0.4472.124',
    //   '90.0.4430.212',
    //   '89.0.4389.82',
    //   '78.0.3904.97',
    //   '80.0.3987.122'
    // ]
    // Randomly pick an OS, Browser, and Version
    // let randomOS = osList[Math.floor(Math.random() * osList.length)]
    // let randomBrowser = browsers[Math.floor(Math.random() * browsers.length)]
    // let randomVersion = browserVersions[Math.floor(Math.random() * browserVersions.length)]
    // Generate a fake User-Agent
    let fakeUserAgent = `Mozilla/5.0 (Windows NT 10.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36`
    return fakeUserAgent
  }
  const [chromeDetail, setChromeDetail] = useState<ChromeDetailsType>({
    browser: 'Chrome',
    OS: 'Window',
    userAgent: getRandomUserAgent()
  })
  // let renderView = useSelector((state: RootState) => {

  const userProfile: UserProfileType = useSelector((state: RootState) => state.userProfile)
  const dispatch = useDispatch()

  return (
    <div className=" h-full flex text-black">
      <div className="flex-1 h-full overflow-y-auto overflow-x-hidden flex flex-col gap-4 p-4">
        <div>
          <div className="flex justify-between items-center top-menu">
            {/* ///TOP  */}
            {/* <div>TEST NAME : {userProfile.name}</div> */}
            <h2>Tạo mới hồ sơ</h2>
            <div>Profile</div>
          </div>

          <div className="grid grid-cols-1 mt-[40px] gap-4">
            <InputComponent
              placeholder="Tên Profile"
              icon={<LuUser />}
              onChange={(event) => {
                // userProfile.name = event.target.value
                // updateUserName()
                // setChromeDetail((prevDetail) => ({
                //   ...prevDetail,
                //   profileName: event.target.value // Update the profileName only
                // }))
              }}
            />
            {/* <InputComponent /> */}

            <ActionButton
              className="w-[200px]"
              onClick={async () => {
                let response = await getRandomUserAgent()
                console.log('CALL THIS ', response)
              }}
            >
              <div className="flex items-center gap-4 py-2 px-2">
                <LuPlus />
                Tạo Hồ Sơ
              </div>
            </ActionButton>
            <div className="divider"></div>

            <ChromeCreateProfileTabs />
          </div>
        </div>
      </div>
      <div className="w-[350px] border-l border-gray-200 h-full overflow-y-auto  p-4">
        {/* <div className="h-[200vh]">GHG 11</div> */}
        <ChromeDetails
          profileName={chromeDetail?.profileName}
          browser={chromeDetail.browser}
          OS={chromeDetail.OS}
          userAgent={chromeDetail.userAgent}
        />
      </div>
    </div>
  )
}
