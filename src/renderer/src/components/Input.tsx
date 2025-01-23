import { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

interface InputTypeProps extends ComponentProps<'input'> {
  // mode?: 'create-profile' | 'manage-profile'
  label?: string
  placeholder?: string
  icon?: React.ReactNode
}
// className={twMerge(
//   'px-2 py-1 rounded-md border border-zinc-400/50 hover:bg-zinc-600/50 transition-colors duration-100',
//   className
// )}
// {...props}
export const InputComponent = ({
  className,
  icon,
  label,
  placeholder,
  ...props
}: InputTypeProps) => {
  return (
    <div>
      <label className="input input-bordered flex items-center gap-2">
        {icon && icon}
        {label}
        <input className={twMerge('grow', className)} {...props} placeholder={placeholder} />
      </label>
    </div>
  )
}
