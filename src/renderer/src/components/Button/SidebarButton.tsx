import { twMerge } from 'tailwind-merge'
import { ActionButton, ActionButtonProps } from './ActionButton'
interface SidebarProps extends ActionButtonProps {
  title: string
  icon?: React.ReactNode
}

export const SidebarButton = ({ children, className, title, icon, ...props }: SidebarProps) => {
  let Icon = icon
  return (
    <ActionButton className={twMerge('py-3', className)} {...props}>
      <div className="flex items-center gap-2">
        {Icon && Icon}
        <span className="">{title}</span>
      </div>
    </ActionButton>
  )
}
