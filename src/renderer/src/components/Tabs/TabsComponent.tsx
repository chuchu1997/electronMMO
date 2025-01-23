import React from 'react'
import { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

export interface Tab {
  title: string
  content: React.ReactNode
}

interface TabComponentProps extends ComponentProps<'div'> {
  tabs: Tab[]
}

export const TabsComponent = ({ className, tabs, ...props }: TabComponentProps) => {
  return (
    <div role="tablist" className={twMerge('tabs tabs-lifted', className)} {...props}>
      {tabs.map((tab, index) => (
        <React.Fragment key={index}>
          <input
            type="radio"
            name="my_tabs_1"
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

      {/* <input type="radio" name="my_tabs_1" role="tab" className="tab" aria-label="Tab 1" />
      <div role="tabpanel" className="tab-content p-10">
        Tab content 1
      </div>
      <input
        type="radio"
        name="my_tabs_1"
        role="tab"
        className="tab"
        aria-label="Tab 2"
        defaultChecked
      />
      <div role="tabpanel" className="tab-content p-10">
        Tab content 2
      </div>

      <input type="radio" name="my_tabs_1" role="tab" className="tab" aria-label="Tab 3" />
      <div role="tabpanel" className="tab-content p-10">
        Tab content 3
      </div> */}
    </div>
  )
}
