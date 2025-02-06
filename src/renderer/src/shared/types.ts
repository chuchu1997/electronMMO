import { UserProfileType } from '../../../types'
import { ChromeProfile } from './models'

///SHARE fOLDER (Dùng để define các hàm , mã nguồn chia sẽ dùng chung giữa Main và Render Process !!!)
export type OpenChromeWithMultipleProfile = (profiles: UserProfileType[]) => Promise<void>
export type CloseChromeWithMultipleProfile = (profiles: UserProfileType[]) => Promise<void>
export type CloseChromeWithProfile = (profile: UserProfileType) => Promise<void>
export type OpenChromeWithProfile = (profile: UserProfileType) => Promise<void>
export type SaveChromeProfile = (userProfile: UserProfileType) => Promise<void>
export const TestF = () => {}
