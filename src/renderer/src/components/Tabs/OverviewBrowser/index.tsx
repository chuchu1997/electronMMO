import { InputComponent } from '../../Input'
import React from 'react'
import { DropdownButton } from '../../DropdownButton'
import { DropdownMenu } from '../../DropdownButton/DropdownMenu'
import { useStoreCallback } from '../../../redux/callback'
export const OverViewBrowser = () => {
  const screenResolutions = ['125x125', '1024x768', '1920x1080']

  const versionChrome = () => {
    const listVersionChrome: number[] = []
    for (let i = 117; i <= 132; i++) {
      listVersionChrome.push(i)
    }
    return listVersionChrome
  }
  let chromeVersions: number[] = versionChrome()

  const { userProfileSelector, onDispatchUpdateBrowserProfile, onRandomUserAgent } =
    useStoreCallback()

  const handleInputChange = (event) => {
    const { name, value } = event.target
    onDispatchUpdateBrowserProfile({
      ...userProfileSelector,
      [name]: value
    })
  }

  const changeChromeVersionFromUserAgent = (version: number) => {
    if (userProfileSelector.userAgent) {
      const regex = /Chrome\/(\d+\.\d+\.\d+\.\d+)/
      const match = userProfileSelector.userAgent.match(regex)

      if (match) {
        const chromeVersion = match[1] // Lấy giá trị phiên bản từ nhóm trong biểu thức chính quy
        console.log('Chrome version:', chromeVersion) // In ra phiên bản Chrome
        let newVersion = userProfileSelector.userAgent.replace(
          `Chrome/${chromeVersion}`,
          `Chrome/${version}.0.0.0`
        )

        onDispatchUpdateBrowserProfile({
          ...userProfileSelector,
          userAgent: newVersion
        })
      }
    }
  }
  const onHandleBtnDelay = (mode: 'plus' | 'sub') => {
    switch (mode) {
      case 'plus':
        userProfileSelector.delayOpenSeconds++
        onDispatchUpdateBrowserProfile({
          ...userProfileSelector,
          delayOpenSeconds: userProfileSelector.delayOpenSeconds
        })
        break

      case 'sub':
        if (userProfileSelector.delayOpenSeconds > 0) userProfileSelector.delayOpenSeconds--
        onDispatchUpdateBrowserProfile({
          ...userProfileSelector,
          delayOpenSeconds: userProfileSelector.delayOpenSeconds
        })
        break
    }
  }
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
          value={userProfileSelector.userAgent}
          onChange={handleInputChange}
        />
        <button className="btn btn-neutral absolute top-0 right-0" onClick={onRandomUserAgent}>
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
                    onDispatchUpdateBrowserProfile({
                      ...userProfileSelector,
                      screen: resolution
                    })
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
          value={userProfileSelector.startURL}
          onChange={handleInputChange}
        />

        <div className="relative">
          <div className="absolute top-0 right-0 flex gap-1">
            <button className="btn btn-neutral" onClick={() => onHandleBtnDelay('sub')}>
              -
            </button>
            <button className="btn btn-neutral" onClick={() => onHandleBtnDelay('plus')}>
              +
            </button>
          </div>

          <InputComponent
            type="number"
            placeholder="Delay mở (seconds)"
            name="delayOpenSeconds"
            value={userProfileSelector.delayOpenSeconds}
            onChange={handleInputChange}
          ></InputComponent>
        </div>
      </section>
    </div>
  )
}
