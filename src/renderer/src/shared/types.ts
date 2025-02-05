import { UserProfileType } from '../../../types'
import { ChromeProfile } from './models'

export type OpenChromeWithMultipleProfile = (profiles: ChromeProfile[]) => Promise<void>
export type CloseChromeWithProfile = (profile: UserProfileType) => Promise<void>
export type OpenChromeWithProfile = (profile: UserProfileType) => Promise<void>
export type SaveChromeProfile = (userProfile: UserProfileType) => Promise<void>
export const TestF = () => {}
