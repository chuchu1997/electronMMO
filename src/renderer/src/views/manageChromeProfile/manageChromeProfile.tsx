import { UserProfileType } from '@shared/models'
import { ActionButton } from '../../components'
import { useEffect, useState } from 'react'
import { LuPause, LuPlay, LuTrash } from 'react-icons/lu'
import { CustomToast } from '../../toast'
import { useStoreCallback } from '../../redux/callback'

// import XLSX from 'xlsx'
// import path from 'path'

export const ManageChromeProfiles = () => {
  const { chromeProfileStateSelector, onDispatchUpdateChromeStateFromProfile } = useStoreCallback()

  const [selectProfiles, setSelectProfiles] = useState<UserProfileType[]>([])

  const [enabledTopActionButton, setEnabledTopActionButton] = useState(false)

  useEffect(() => {
    if (chromeProfileStateSelector) {
    }
  }, [chromeProfileStateSelector])
  // useEffect
  useEffect(() => {
    selectProfiles.length > 0 ? setEnabledTopActionButton(true) : setEnabledTopActionButton(false)
  }, [selectProfiles])

  const onHandleOpenChromeProfile = async (profile: UserProfileType) => {
    let result = await window.electron.openChromeProfile(profile)

    if (result.isOpen) {
      CustomToast.success({ message: result.message })

      let updateProfileStatus: UserProfileType[] = [...chromeProfileStateSelector]
      updateProfileStatus = updateProfileStatus.map((proI) => {
        if (proI.profileName == profile.profileName) {
          return { ...proI, isRunning: result.isOpen }
        }
        return proI
      })

      onDispatchUpdateChromeStateFromProfile(updateProfileStatus)
    }
  }
  const onHandleCloseChromeProfile = async (profile: UserProfileType) => {
    let result = await window.electron.closeChromeProfile(profile)
    if (!result.isOpen) {
      CustomToast.success({ message: result.message })
      let updateProfileStatus: UserProfileType[] = [...chromeProfileStateSelector]
      updateProfileStatus = updateProfileStatus.map((proI) => {
        if (proI.profileName == profile.profileName) {
          return { ...proI, isRunning: result.isOpen }
        }
        return proI
      })
      onDispatchUpdateChromeStateFromProfile(updateProfileStatus)
    }
  }
  const onHandleOpenMultipleProfile = async (profiles: UserProfileType[]) => {
    let result = await window.electron.openChromeWithMultipleProfile(profiles)

    if (result.profilesOpen.length > 0) {
      CustomToast.success({ message: result.message })
      let updateProfileStatus: UserProfileType[] = [...chromeProfileStateSelector]

      for (let originalProfile of updateProfileStatus) {
        for (let updateProfile of result.profilesOpen) {
          if (updateProfile.profileName == originalProfile.profileName) {
            originalProfile.isRunning = updateProfile.isRunning
          }
        }
      }
      onDispatchUpdateChromeStateFromProfile(updateProfileStatus)
      // updateProfileStatus = updateProfileStatus.map((proI) => {
      //   if (proI.profileName == profile.profileName) {
      //     return { ...proI, isRunning: result.isOpen }
      //   }
      //   return proI
      // })
    }
  }
  const onHandleCloseMultipleProfile = async (profiles: UserProfileType[]) => {
    let result = await window.electron.closeChromeWithMultipleProfile(profiles)

    if (result.profilesClose.length > 0) {
      CustomToast.success({ message: result.message })
      let updateProfileStatus: UserProfileType[] = [...chromeProfileStateSelector]

      for (let originalProfile of updateProfileStatus) {
        for (let updateProfile of result.profilesClose) {
          if (updateProfile.profileName == originalProfile.profileName) {
            originalProfile.isRunning = updateProfile.isRunning
          }
        }
      }
      onDispatchUpdateChromeStateFromProfile(updateProfileStatus)
    }
  }
  const onHandleDeleteMultipleProfile = async (profiles: UserProfileType[]) => {
    let response = await window.electron.deleteMultipleUserChromeProfile(profiles)
    if (response.status == 200) {
      CustomToast.success({ message: response.message })
      let updateListAfterDelete = [...chromeProfileStateSelector]
      for (let i = 0; i < profiles.length; i++) {
        if (updateListAfterDelete.includes(profiles[i])) {
          let index = updateListAfterDelete.findIndex((item) => item.id === profiles[i].id)
          updateListAfterDelete.splice(index, 1)
        }
      }

      onDispatchUpdateChromeStateFromProfile(updateListAfterDelete)
      //          updateListAfterDelete = updateListAfterDelete.filter(
      //   (item) => item.id !== profile.id
      // )
    }
    // let result = await window.electron.deleteUserChromeProfile(profile)
    // if (result.status == 200) {
    //   let updateListAfterDelete = [...chromeProfileStateSelector]
    //   updateListAfterDelete = updateListAfterDelete.filter(
    //     (item) => item.id !== profile.id
    //   )
    //   onDispatchUpdateChromeStateFromProfile(updateListAfterDelete)

    //   CustomToast.success({ message: result.message })
    // }
  }
  const RenderTopAction = () => {
    return (
      <div className="flex gap-2 ">
        <ActionButton
          className="flex items-center gap-2"
          onClick={() => onHandleOpenMultipleProfile(selectProfiles)}
        >
          <LuPlay color="green" />
          Mở ({selectProfiles.length}) Profile
        </ActionButton>
        <ActionButton
          className="flex items-center gap-2"
          onClick={() => onHandleCloseMultipleProfile(selectProfiles)}
        >
          <LuPause color="red" />
          Đóng ({selectProfiles.length}) Profile
        </ActionButton>

        <ActionButton
          className="flex items-center gap-2"
          onClick={() => onHandleDeleteMultipleProfile(selectProfiles)}
        >
          <LuTrash color="red" />
          Xóa ({selectProfiles.length}) Profile
        </ActionButton>
      </div>
    )
  }

  return (
    <div className="overflow-x-auto flex flex-col items-start gap-4">
      {enabledTopActionButton ? <RenderTopAction></RenderTopAction> : <></>}
      <table className="table">
        <thead>
          <tr>
            <th>
              <div className="flex items-center gap-4">
                <input
                  type="checkbox"
                  className="checkbox"
                  id="select-all"
                  onChange={() => {
                    const selectAllCheckbox = document.getElementById(
                      'select-all'
                    ) as HTMLInputElement
                    const checkboxes = document.querySelectorAll(
                      '.checkbox'
                    ) as NodeListOf<HTMLInputElement>

                    checkboxes.forEach((checkbox) => {
                      checkbox.checked = selectAllCheckbox.checked
                    })

                    const selectedItems = Array.from(checkboxes)
                      .splice(1)
                      .filter((checkbox) => {
                        return (checkbox as HTMLInputElement).checked
                      })

                    let tempSelectProfiles: UserProfileType[] = []
                    for (let boxChecked of selectedItems) {
                      const row = (boxChecked as HTMLInputElement).closest('tr')
                      if (row) {
                        let cells = Array.from(row.cells).slice(2)
                        let data = chromeProfileStateSelector.find(
                          (profile) => profile.profileName === cells[0].innerText
                        )
                        if (data) {
                          tempSelectProfiles.push(data)
                        }
                      }
                    }
                    setSelectProfiles(tempSelectProfiles)
                  }}
                ></input>
                <span>Check</span>
              </div>
            </th>
            <th>ID</th>
            <th>Name</th>
            <th>Proxy</th>
            <th>Screen</th>
            <th>Agent</th>
            <th>StartURL</th>
            <th>Chrome Version</th>
            <th>Delay</th>
            <th>Created</th>
            <th>Path</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {chromeProfileStateSelector.map((profile) => (
            // <div key={profile.profileName}>{profile.profileName}</div>
            <tr key={profile.id}>
              <td>
                <input
                  type="checkbox"
                  className="checkbox"
                  onChange={() => {
                    const checkboxes = document.querySelectorAll('input[type="checkbox"]')
                    const selectedItems = Array.from(checkboxes).filter((checkbox) => {
                      return (checkbox as HTMLInputElement).checked
                    })
                    // const selectedItems = Array.from(checkboxes).filter((checkbox) => checkbox)
                    let tempSelectProfiles: UserProfileType[] = []
                    for (let boxChecked of selectedItems) {
                      const row = (boxChecked as HTMLInputElement).closest('tr')
                      if (row) {
                        let cells = Array.from(row.cells).slice(2)
                        let data = chromeProfileStateSelector.find(
                          (profile) => profile.profileName === cells[0].innerText
                        )
                        if (data) {
                          tempSelectProfiles.push(data)
                        }
                      }
                    }

                    setSelectProfiles(tempSelectProfiles)
                  }}
                />
              </td>
              <td className="max-w-[100px] truncate">{profile.id}</td>
              <td>{profile.profileName}</td>
              <td>{profile.proxy?.proxyIP ?? ''}</td>
              <td>{profile.screen}</td>
              <td className="max-w-[200px]">{profile.userAgent}</td>
              <td>{profile.startURL}</td>
              <td>{profile.version}</td>
              <td>{profile.delayOpenSeconds}</td>
              <td>{profile.created}</td>
              <td>{profile.pathSave}</td>
              <td>
                <div className="flex gap-2">
                  {profile.isRunning ? (
                    <ActionButton
                      onClick={() => {
                        onHandleCloseChromeProfile(profile)
                      }}
                    >
                      Đóng
                    </ActionButton>
                  ) : (
                    <ActionButton
                      onClick={() => {
                        onHandleOpenChromeProfile(profile)
                      }}
                    >
                      Mở Chrome
                    </ActionButton>
                  )}
                  {/* {profile.isRunning ? <ActionButton>Đóng</ActionButton> ? <ActionButton>Mở</ActionButton> */}
                  <ActionButton
                    onClick={async () => {
                      let result = await window.electron.deleteUserChromeProfile(profile)
                      if (result.status == 200) {
                        let updateListAfterDelete = [...chromeProfileStateSelector]
                        updateListAfterDelete = updateListAfterDelete.filter(
                          (item) => item.id !== profile.id
                        )
                        onDispatchUpdateChromeStateFromProfile(updateListAfterDelete)

                        CustomToast.success({ message: result.message })
                      }
                    }}
                  >
                    Xóa
                  </ActionButton>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* <div className="action-buttons">
        <ActionButton
          onClick={() => {
            // ('PROFILES[0]', profiles[])
          }}
        >
          Tạo Chrome Profile
        </ActionButton>
      </div>

      <div className="action-buttons">
        <ActionButton
          onClick={() => {
            ('CHROME NE!!', chromeProfileStateSelector)
          }}
        >
          Kiem tra item
        </ActionButton>
      </div> */}
    </div>
  )
}
