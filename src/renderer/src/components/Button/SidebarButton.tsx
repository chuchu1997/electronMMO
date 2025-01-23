import { twMerge } from 'tailwind-merge'
import { ActionButton, ActionButtonProps } from './ActionButton'
import { LuMenu, LuPlus } from 'react-icons/lu'
interface SidebarButtonProps extends ActionButtonProps {
  mode?: 'create-profile' | 'manage-profile'
}

export const SidebarButton = ({ children, className, mode, ...props }: SidebarButtonProps) => {
  let Icon: React.ReactNode
  let title: string
  let iconSize = 18

  // Using switch case to render different icons based on the mode
  switch (mode) {
    case 'create-profile':
      Icon = <LuPlus size={iconSize} />
      title = 'Tạo mới hồ sơ'
      break
    case 'manage-profile':
      Icon = <LuMenu size={iconSize} /> // Icon for manage-profile mode
      title = 'Quản lý hồ sơ'
      break
    default:
      Icon = null
      title = '' // No icon for other modes
  }
  return (
    <ActionButton className={twMerge('py-3', className)} {...props}>
      {mode != null ? (
        <div className="flex items-center gap-2">
          {Icon && Icon}
          <span>{title}</span>
        </div>
      ) : (
        children
      )}
    </ActionButton>
  )
}
