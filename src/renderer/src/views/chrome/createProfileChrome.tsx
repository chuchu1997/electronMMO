import { LuPlus, LuUser } from 'react-icons/lu'
import {
  ActionButton,
  ChromeDetails,
  ChromeCreateProfileTabs,
  InputComponent
} from '../../components'
import { useStoreCallback } from '../../redux/callback'
import { CustomToast } from '../../toast'

export const CreateProfileChromeView = () => {
  const {
    userProfileSelector,
    onDispatchUpdateBrowserProfile,
    onResetBrowserProfile,
    onRandomUserAgent
  } = useStoreCallback()

  return (
    <div className=" h-full flex text-black">
      <div className="flex-1 h-full overflow-y-auto overflow-x-hidden flex flex-col gap-4 ">
        <div>
          <div className="flex justify-between items-center top-menu">
            <h2>Tạo mới hồ sơ</h2>
            <div>Profile</div>
          </div>

          <div className="grid grid-cols-1 mt-[40px] gap-4">
            <InputComponent
              placeholder="Tên Profile"
              icon={<LuUser />}
              value={userProfileSelector.profileName}
              onChange={(event) => {
                onDispatchUpdateBrowserProfile({
                  ...userProfileSelector,
                  profileName: event.target.value
                })
              }}
            />

            <ActionButton
              className="w-[200px]"
              onClick={async () => {
                console.log('USER PROFILE', userProfileSelector)

                const result = await window.electron.saveUserProfile(userProfileSelector)
                console.log('CALL NE')
                if (result.success) {
                  CustomToast.success({ message: 'Tạo user profile thành công ' })

                  onResetBrowserProfile()
                  setTimeout(() => {
                    //ADD DELAY
                    onRandomUserAgent()
                  }, 1000)
                } else {
                  CustomToast.error({ message: result.message })
                }
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
        // profileName={chromeDetail?.profileName}
        // browser={chromeDetail.browser}
        // OS={chromeDetail.OS}
        // userAgent={chromeDetail.userAgent}
        />
      </div>
    </div>
  )
}
