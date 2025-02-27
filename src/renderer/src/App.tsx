import { useSelector } from 'react-redux'
import { Content, RootLayout, SideBar, DraggableTopBar, ActionButton } from './components'

// import {current}

import { DashboardView, CreateProfileChromeView, ManageChromeProfiles } from './views'
import { RootState } from 'src/types'
// import {} from "@/"

function App(): JSX.Element {
  // const renderView = useSelector((state: any) => state.view)
  let renderView = useSelector((state: RootState) => {
    switch (state.currentView.view) {
      case 'dashboard':
        return <DashboardView />
      case 'create-profile':
        return <CreateProfileChromeView />
      case 'manage-proxy':
        return <>THIS IS MANAGE PROXY</>
      case 'manage-profile':
        return <ManageChromeProfiles />
      default:
        return <></>
    }
  })
  // const renderView = useSelector((state: RootState) => state.view)

  // const ipcHandle = (): void => window.electron.ipcRenderer.send('ping')
  return (
    <>
      <DraggableTopBar className="" />
      <RootLayout className="">
        <SideBar className="p-2  text-black"></SideBar>
        <Content className="border-l border-l-black/40 pt-[40px] text-black p-4 ">
          {renderView}
        </Content>
      </RootLayout>
    </>
  )
}

export default App
