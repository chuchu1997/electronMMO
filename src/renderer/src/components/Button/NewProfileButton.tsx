import { twMerge } from 'tailwind-merge'
import { ActionButton, ActionButtonProps } from './ActionButton'
import { LuPlus } from 'react-icons/lu'
export const NewProfileButton = ({ children, className, ...props }: ActionButtonProps) => {
  return (
    <ActionButton className={twMerge('py-4', className)} {...props}>
      <div className="flex items-center gap-4 pl-2">
        <LuPlus size={20} />
        <span>Tạo Mới Hồ Sơ</span>
      </div>
    </ActionButton>
  )
}
