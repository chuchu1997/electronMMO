import React, { useEffect, useRef } from 'react'
import { ComponentProps, useState } from 'react'
import { LuArrowDown } from 'react-icons/lu'
import { twMerge } from 'tailwind-merge'

export interface DropdownProps extends ComponentProps<'div'> {
  title: string // Trường title để hiển thị
  className?: string
  children: React.ReactNode // Các mục của dropdown
  fullWidthBtn?: boolean
}

export const DropdownButton = ({
  className,
  fullWidthBtn,
  title,
  children,
  ...props
}: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const toggleDropdown = () => {
    if (!isOpen) {
      setIsOpen(true)
    }
    // setIsOpen((prev) => !prev)
  }
  const closeDropdown = () => {
    setIsOpen(false)
  }

  return (
    <div className={twMerge('dropdown ', className)} {...props}>
      {/* Nút click để mở/đóng dropdown */}
      <div
        tabIndex={0}
        role="button"
        className={twMerge(`btn btn-neutral ${fullWidthBtn && 'w-full'}`)}
        onClick={toggleDropdown} // Mở hoặc đóng dropdown
      >
        {title}
        <LuArrowDown />
      </div>

      {/* Dropdown MENU */}
      {isOpen && (
        <div className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
          {React.cloneElement(children as React.ReactElement, { closeDropdown })}
        </div>
      )}
    </div>
  )
}
