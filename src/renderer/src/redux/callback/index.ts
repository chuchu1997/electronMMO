import { useDispatch, useSelector } from 'react-redux'
import { updateView, UpdateStateForChromeProfile, updateCreateUserProfile } from '../actions'

import { ManageView, RootState, UserProfileType } from '@shared/models'
export const useStoreCallback = () => {
  const dispatch = useDispatch()

  const chromeProfileStateSelector: UserProfileType[] = useSelector(
    (state: RootState) => state.chromeProfileWithState
  )
  // const chromeProfileWithStateSelector: UserProfileType = useSelector((state: UserProfileType) => state)
  const createUserProfileStateSelector: UserProfileType = useSelector(
    (state: RootState) => state.createUserProfileState
  )

  const onDispatchUpdateCreateUserProfile = (profile: UserProfileType) => {
    dispatch(updateCreateUserProfile(profile))
  }

  const onDispatchChangeView = (view: ManageView) => {
    dispatch(updateView(view))
  }
  const onDispatchUpdateChromeStateFromProfile = (profiles: UserProfileType[]) => {
    dispatch(
      // UpdateStateForChromeProfile({
      //  [...profiles]
      // })
      UpdateStateForChromeProfile(profiles)
    )
  }
  const onRandomUserAgent = () => {
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
    const randomIndex = Math.floor(Math.random() * userAgentsGen.length)
    onDispatchUpdateCreateUserProfile({
      ...createUserProfileStateSelector,
      userAgent: userAgentsGen[randomIndex]
    })
  }

  const onResetBrowserProfile = () => {
    dispatch(
      updateCreateUserProfile({
        profileName: '',
        browser: 'chrome',
        os: '',
        version: 130,
        userAgent:
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/132.0.0.0 Safari/537.36',
        screen: '1920x1080',
        cpu: 4,
        languages: 'vn',
        startURL: '',
        delayOpenSeconds: 0,
        webRTC: 'real',
        getlocation: 'prompt',
        timeZone: '',
        clientRects: 'off',
        audioContext: 'off',
        fonts: 'off',
        proxy: {
          proxyType: 'http-proxy',
          proxyIP: '',
          port: 0,
          username: '',
          password: ''
        }
      })
    )
  }
  return {
    createUserProfileStateSelector,
    onDispatchChangeView,
    onDispatchUpdateCreateUserProfile,
    onResetBrowserProfile,
    onRandomUserAgent,
    onDispatchUpdateChromeStateFromProfile,
    chromeProfileStateSelector
  }
  // const selector =  useSelector();
}
