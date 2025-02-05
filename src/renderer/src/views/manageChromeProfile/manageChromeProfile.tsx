import { UserProfileType } from 'src/types'
import { ActionButton } from '../../components'
import { useEffect, useState } from 'react'
import { LuPause, LuPlay } from 'react-icons/lu'
import { CustomToast } from '../../toast'

// import XLSX from 'xlsx'
// import path from 'path'

export const ManageChromeProfiles = () => {
  const readInformationChromeProfilesInExcelFile = async () => {
    let result = await window.electron.readChromeProfilesFromExcel()
    // console.log('PROFILE', result[0].)
    if (result.status == 200) {
      console.log('RESULT', result.profiles[0].isRunning)
      setProfiles(result.profiles)
    }
  }

  const [profiles, setProfiles] = useState<UserProfileType[]>([])

  const [selectProfiles, setSelectProfiles] = useState<UserProfileType[]>([])

  const [enabledTopActionButton, setEnabledTopActionButton] = useState(false)
  useEffect(() => {
    readInformationChromeProfilesInExcelFile()
  }, [])

  useEffect(() => {
    selectProfiles.length > 0 ? setEnabledTopActionButton(true) : setEnabledTopActionButton(false)
  }, [selectProfiles])

  const RenderTopAction = () => {
    return (
      <div className="flex gap-2 ">
        <ActionButton className="flex items-center gap-2">
          <LuPlay color="green" />
          Mở ({selectProfiles.length}) Profile
        </ActionButton>
        <ActionButton className="flex items-center gap-2">
          <LuPause color="red" />
          Đóng ({selectProfiles.length}) Profile
        </ActionButton>
      </div>
    )
  }

  const onHandleOpenChromeProfile = async (profile: UserProfileType) => {
    let result = await window.electron.openChromeProfile(profile)

    if (result.isOpen) {
      CustomToast.success({ message: result.message })
      setProfiles((prev) => {
        return prev.map((proI) => {
          if (proI.profileName == profile.profileName) {
            return { ...proI, isRunning: result.isOpen }
          }
          return proI
        })
      })
      //   setProfiles({})
    }
  }
  const onHandleCloseChromeProfile = (profile: UserProfileType) => {
    window.electron.closeChromeProfile(profile)
  }
  const onHandleOpenMultipleProfile = (profiles: UserProfileType[]) => {}
  const onHandleCloseMultipleProfile = (profiles: UserProfileType[]) => {}
  return (
    <div className="overflow-x-auto flex flex-col items-start gap-4">
      {enabledTopActionButton ? <RenderTopAction></RenderTopAction> : <></>}
      <table className="table">
        <thead>
          <tr>
            <th>Check</th>
            <th>Name</th>
            <th>Proxy</th>
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
          {profiles.map((profile) => (
            // <div key={profile.profileName}>{profile.profileName}</div>
            <tr key={profile.profileName}>
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

                    selectedItems.forEach((checkbox, index) => {
                      //SKIP ROW 1
                      const row = (checkbox as HTMLInputElement).closest('tr') // Lấy hàng chứa checkbox và ép kiểu thành HTMLTableRowElement

                      if (row) {
                        const cells = Array.from(row.cells).slice(1) // Lấy các cell từ chỉ số 1 trở đi
                        let data = profiles.find(
                          (profile) => profile.profileName === cells[0].innerText
                        )
                        if (data) {
                          tempSelectProfiles.push(data)
                        }
                      }
                    })
                    setSelectProfiles(tempSelectProfiles)
                  }}
                />
              </td>
              <td>{profile.profileName}</td>
              <td>{profile.proxy?.proxyIP ?? ''}</td>
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
                  <ActionButton>Xóa</ActionButton>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="action-buttons">
        <ActionButton onClick={() => {}}>Tạo Chrome Profile</ActionButton>
      </div>
    </div>
  )
}
