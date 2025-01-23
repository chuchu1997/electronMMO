import { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'
export const DraggableTopBar = ({ className, ...props }: ComponentProps<'header'>) => {
  return (
    <header
      className={twMerge('absolute inset-0 h-8 bg-transparent', className)}
      {...props}
    ></header>
  )
}
