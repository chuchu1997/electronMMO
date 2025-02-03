import React from 'react'
import { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

export interface Tab {
  title: string
  content: React.ReactNode
}

interface TabComponentProps extends ComponentProps<'div'> {
  tabs: Tab[]
  name?: string
}

export const TabsComponent = ({ className, tabs, name, ...props }: TabComponentProps) => {
  return (
    <div role="tablist" className={twMerge('tabs tabs-lifted', className)} {...props}>
      {tabs.map((tab, index) => (
        <React.Fragment key={index}>
          <input
            type="radio"
            name={name}
            role="tab"
            className="tab"
            aria-label={tab.title}
            defaultChecked={index === 0} // Đảm bảo rằng tab đầu tiên sẽ được chọn mặc định
          />
          <div role="tabpanel" className="tab-content p-10">
            {tab.content} {/* Dùng nội dung từ tab */}
          </div>
        </React.Fragment>
      ))}
    </div>
  )
}
