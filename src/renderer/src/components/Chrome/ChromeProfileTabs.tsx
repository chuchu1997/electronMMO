import { ComponentProps } from 'react'
import { TabsComponent } from '../Tabs/TabsComponent'

import { OverViewBrowser } from '../Tabs'
// import chrome from 'selenium-webdriver/chrome'
// import { Builder } from 'selenium-webdriver'

// const { Builder } = require('selenium-webdriver');
// import {Builder}

export const ChromeCreateProfileTabs = ({ className, ...props }: ComponentProps<'div'>) => {
  const handleOPEN = async () => {
    window.electron.openChromeProfile()
  }

  return (
    <TabsComponent
      tabs={[
        {
          title: 'Tổng Quan ',
          content: <OverViewBrowser />
        },
        { title: 'Mạng', content: <div>HUHU2</div> },
        { title: 'Vị trí', content: <div>HUHU3</div> }
      ]}
    />
  )
}
