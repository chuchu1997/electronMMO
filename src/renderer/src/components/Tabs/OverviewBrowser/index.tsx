import { InputComponent } from '../../Input'
import React from 'react'
import { DropdownButton } from '../../DropdownButton'
import { DropdownMenu } from '../../DropdownButton/DropdownMenu'
import { useStoreCallback } from '../../../redux/callback'
import { VersionType } from '@shared/models'
import { CustomToast } from '../../../toast'
export const OverViewBrowser = () => {
  const screenResolutions = ['125x125', '1024x768', '1920x1080']

  const versionChrome = () => {
    const listVersionChrome: VersionType[] = []
    for (let i = 117; i <= 132; i++) {
      listVersionChrome.push(i as VersionType)
    }
    return listVersionChrome
  }
  let chromeVersions: VersionType[] = versionChrome()

  const { createUserProfileStateSelector, onDispatchUpdateCreateUserProfile, onRandomUserAgent } =
    useStoreCallback()

  const handleInputChange = (event) => {
    const { name, value } = event.target
    onDispatchUpdateCreateUserProfile({
      ...createUserProfileStateSelector,
      [name]: value
    })
  }

  const changeChromeVersionFromUserAgent = (version: VersionType) => {
    console.log('HELL OWORLD')
    if (createUserProfileStateSelector.userAgent) {
      console.log('MATCH')
      const regex = /Chrome\/(\d+\.\d+\.\d+\.\d+)/
      const match = createUserProfileStateSelector.userAgent.match(regex)
      console.log('MATCH')
      if (match) {
        const chromeVersion = match[1] // Lấy giá trị phiên bản từ nhóm trong biểu thức chính quy
        console.log('Chrome version:', chromeVersion) // In ra phiên bản Chrome
        let newVersion = createUserProfileStateSelector.userAgent.replace(
          `Chrome/${chromeVersion}`,
          `Chrome/${version}.0.0.0`
        )
        onDispatchUpdateCreateUserProfile({
          ...createUserProfileStateSelector,
          version: version
          // userAgent: newVersion
        })
      }
    } else {
      CustomToast.error({ message: 'Sai cú pháp user agent' })
    }
  }
  const onHandleBtnDelay = (mode: 'plus' | 'sub') => {
    switch (mode) {
      case 'plus':
        createUserProfileStateSelector.delayOpenSeconds++
        onDispatchUpdateCreateUserProfile({
          ...createUserProfileStateSelector,
          delayOpenSeconds: createUserProfileStateSelector.delayOpenSeconds
        })
        break

      case 'sub':
        if (createUserProfileStateSelector.delayOpenSeconds > 0)
          createUserProfileStateSelector.delayOpenSeconds--
        onDispatchUpdateCreateUserProfile({
          ...createUserProfileStateSelector,
          delayOpenSeconds: createUserProfileStateSelector.delayOpenSeconds
        })
        break
    }
  }
  return (
    <div className="flex flex-col gap-4">
      <span>{createUserProfileStateSelector.version.toString()}</span>
      <section>
        <DropdownButton title={createUserProfileStateSelector.version.toString()}>
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
          value={createUserProfileStateSelector.userAgent}
          onChange={handleInputChange}
        />
        <button className="btn btn-neutral absolute top-0 right-0" onClick={onRandomUserAgent}>
          Random UserAgent
        </button>
      </section>
      {/* ///SECTION 3 */}
      <section className="grid grid-cols-2 gap-4">
        <DropdownButton
          title={
            createUserProfileStateSelector.screen == ''
              ? 'Chọn Screen'
              : createUserProfileStateSelector.screen
          }
          fullWidthBtn
        >
          <DropdownMenu
            items={[
              ...screenResolutions.map((resolution) => {
                return {
                  label: resolution.toString(),
                  onClick: () => {
                    onDispatchUpdateCreateUserProfile({
                      ...createUserProfileStateSelector,
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
          value={createUserProfileStateSelector.startURL}
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
            value={createUserProfileStateSelector.delayOpenSeconds}
            onChange={handleInputChange}
          ></InputComponent>
        </div>
      </section>
    </div>
  )
}
