import { useEffect } from 'react'
import { useStoreCallback } from '../redux/callback'
export const DashboardView = () => {
  const { onDispatchUpdateChromeStateFromProfile } = useStoreCallback()
  const readInformationChromeProfilesInExcelFile = async () => {
    console.log('CALL THIS !!!!!!')
    let result = await window.electron.readChromeProfilesFromExcel()
    // console.log('PROFILE', result[0].)
    if (result.status == 200) {
      console.log('result', result.profiles)
      onDispatchUpdateChromeStateFromProfile(result.profiles)
      // console.log('RESULT', result.profiles[0].isRunning)
      // setProfiles(result.profiles)
    }
  }

  useEffect(() => {
    readInformationChromeProfilesInExcelFile()
  }, [])
  return <div>Dashboard View !!</div>
}
