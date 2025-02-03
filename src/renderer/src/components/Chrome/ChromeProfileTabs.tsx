import { ComponentProps } from 'react'
import { TabsComponent } from '../Tabs/TabsComponent'

import { OverViewBrowser } from '../Tabs'
import { InternetBrowser } from '../Tabs'
// import chrome from 'selenium-webdriver/chrome'
// import { Builder } from 'selenium-webdriver'

// const { Builder } = requireeeeeeee('selenium-webdriver');
// import {Builder}

export const ChromeCreateProfileTabs = ({ className, ...props }: ComponentProps<'div'>) => {
  const handleOPEN = async () => {
    window.electron.openChromeProfile()
  }
  return (
    <TabsComponent
      name="Main Tabs"
      tabs={[
        {
          title: 'Tổng Quan ',
          content: <OverViewBrowser />
        },
        { title: 'Mạng', content: <InternetBrowser></InternetBrowser> },
        { title: 'Cookies', content: <div>This is cookie tabs </div> }
      ]}
    />
  )
}
