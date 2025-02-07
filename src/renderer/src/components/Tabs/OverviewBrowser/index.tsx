import { InputComponent } from '../../Input'
import React, { useEffect } from 'react'
import { DropdownButton } from '../../DropdownButton'
import { DropdownMenu } from '../../DropdownButton/DropdownMenu'
import { useStoreCallback } from '../../../redux/callback'
import { VersionType } from '@shared/models'
import { CustomToast } from '../../../toast'
import { ActionButton } from '../../Button'
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
  useEffect(() => {
    if (createUserProfileStateSelector.userAgent == '') {
      onRandomUserAgent()
    }
  }, [])

  const changeChromeVersionFromUserAgent = (version: VersionType) => {
    if (createUserProfileStateSelector.userAgent) {
      const regex = /Chrome\/(\d+\.\d+\.\d+\.\d+)/
      const match = createUserProfileStateSelector.userAgent.match(regex)
      if (match) {
        const chromeVersion = match[1] // Lấy giá trị phiên bản từ nhóm trong biểu thức chính quy
        console.log('Chrome version:', chromeVersion) // In ra phiên bản Chrome
        let newVersion = createUserProfileStateSelector.userAgent.replace(
          `Chrome/${chromeVersion}`,
          `Chrome/${version}.0.0.0`
        )
        onDispatchUpdateCreateUserProfile({
          ...createUserProfileStateSelector,
          version: version,
          userAgent: newVersion
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
      <section>
        <DropdownButton
          title={
            createUserProfileStateSelector.version != undefined
              ? createUserProfileStateSelector.version.toString()
              : 'Chọn Version'
          }
        >
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
        <ActionButton className="absolute top-0 right-0 h-full" onClick={onRandomUserAgent}>
          Random UserAgent
        </ActionButton>
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
          <InputComponent
            type="number"
            placeholder="Delay mở (seconds)"
            name="delayOpenSeconds"
            value={createUserProfileStateSelector.delayOpenSeconds}
            onChange={handleInputChange}
            // aria-controls=""
          ></InputComponent>
        </div>
      </section>
    </div>
  )
}
