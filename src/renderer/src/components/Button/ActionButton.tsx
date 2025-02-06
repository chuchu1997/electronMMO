import { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

export type ActionButtonProps = ComponentProps<'button'>

export const ActionButton = ({ children, className, ...props }: ActionButtonProps) => {
  return (
    <button
      className={twMerge(
        'px-2 py-1 rounded-md bg-accent text-white transition-colors duration-100',
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}
