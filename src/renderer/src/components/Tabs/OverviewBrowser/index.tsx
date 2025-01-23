import { useSelector, useDispatch } from 'react-redux'
import { RootState, UserProfileType } from 'src/types'
import { InputComponent } from '../../Input'
import { useState, useEffect } from 'react'
import { updateUserProfile } from '../../../redux/actions'
import React from 'react'
import { DropdownButton } from '../../DropdownButton'
import { DropdownMenu } from '../../DropdownButton/DropdownMenu'

export const OverViewBrowser = () => {
  const userAgentsGen = [
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.64 Safari/537.36',
    'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.5005.115 Safari/537.36',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.5060.134 Safari/537.36',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.5112.101 Safari/537.36',
    'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.5195.125 Safari/537.36',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/106.0.5249.119 Safari/537.36',
    'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.5304.107 Safari/537.36',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.5359.95 Safari/537.36',
    'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.5414.75 Safari/537.36',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.5481.77 Safari/537.36'
  ]

  const screenResolutions = ['125x125', '1024x768', '1920x1080']

  const versionChrome = () => {
    const listVersionChrome: number[] = []
    for (let i = 117; i <= 132; i++) {
      listVersionChrome.push(i)
    }
    return listVersionChrome
  }
  let chromeVersions: number[] = versionChrome()

  const randomUserAgents = () => {
    const randomIndex = Math.floor(Math.random() * userAgentsGen.length)
    setUserBrowserProfile((prev) => ({
      ...prev,
      userAgent: userAgentsGen[randomIndex]
    }))
  }

  const userProfile: UserProfileType = useSelector((state: RootState) => state.userProfile)
  const [userBrowserProfile, setUserBrowserProfile] = useState(userProfile)
  const dispatch = useDispatch()

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setUserBrowserProfile((prevState) => ({
      ...prevState,
      [name]: value // Cập nhật trường tương ứng
    }))
  }
  const updateBrowserProfile = () => {
    dispatch(updateUserProfile(userBrowserProfile))
  }
  const changeChromeVersionFromUserAgent = (version: number) => {
    if (userBrowserProfile.userAgent) {
      const regex = /Chrome\/(\d+\.\d+\.\d+\.\d+)/
      const match = userBrowserProfile.userAgent.match(regex)

      if (match) {
        const chromeVersion = match[1] // Lấy giá trị phiên bản từ nhóm trong biểu thức chính quy
        console.log('Chrome version:', chromeVersion) // In ra phiên bản Chrome
        let newss = userBrowserProfile.userAgent.replace(
          `Chrome/${chromeVersion}`,
          `Chrome/${version}.0.0.0`
        )
        console.log('NEWS', newss)
        setUserBrowserProfile((prevState) => ({
          ...prevState,
          userAgent: newss // Cập nhật trường tương ứng
        }))
      }
    }
  }
  useEffect(() => {
    // Lắng nghe nếu UserBrowserProfile Thay Đổi Tiến Hành UpDATE REDUX !!
    if (userBrowserProfile) {
      updateBrowserProfile()
    }
  }, [userBrowserProfile])
  return (
    <div className="flex flex-col gap-4">
      <section>
        <DropdownButton title="Chọn Version Chrome">
          <DropdownMenu
            items={[
              ...chromeVersions.map((version) => {
                return {
                  label: version.toString(),
                  onClick: () => {
                    changeChromeVersionFromUserAgent(version)
                  }
                }
              })
            ]}
          />
        </DropdownButton>
      </section>
      <section className="relative">
        <InputComponent
          placeholder="userAgent"
          name="userAgent"
          value={userBrowserProfile.userAgent}
          onChange={handleInputChange}
        />
        <button className="btn btn-neutral absolute top-0 right-0" onClick={randomUserAgents}>
          Random UserAgent
        </button>
      </section>
      {/* ///SECTION 3 */}
      <section className="grid grid-cols-2 gap-4">
        <DropdownButton title="Chọn Screen" fullWidthBtn>
          <DropdownMenu
            items={[
              ...screenResolutions.map((resolution) => {
                return {
                  label: resolution.toString(),
                  onClick: () => {
                    // changeChromeVersionFromUserAgent(resolution)
                    //TODO:
                  }
                }
              })
            ]}
          />
        </DropdownButton>

        <InputComponent
          placeholder="Start URL"
          name="startURL"
          value={userBrowserProfile.startURL}
          onChange={handleInputChange}
        />

        <div className="relative">
          <div className="absolute top-0 right-0 flex gap-1">
            <button className="btn btn-neutral ">-</button>
            <button className="btn btn-neutral ">+</button>
          </div>

          <InputComponent
            type="number"
            placeholder="Delay mở (seconds)"
            name="startURL"
          ></InputComponent>
        </div>
      </section>
    </div>
  )
}
