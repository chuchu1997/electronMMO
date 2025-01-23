import { useSelector } from 'react-redux'
import { Content, RootLayout, SideBar, DraggableTopBar, ActionButton } from './components'

// import {current}

import { DashboardView, CreateProfileChromeView } from './views'
import { RootState } from 'src/types'

function App(): JSX.Element {
  // const renderView = useSelector((state: any) => state.view)
  let renderView = useSelector((state: RootState) => {
    if (state.currentView.view === 'dashboard') {
      return <DashboardView />
    }
    if (state.currentView.view === 'create-profile') {
      return <CreateProfileChromeView />
    }
    return <></>
  })
  // const renderView = useSelector((state: RootState) => state.view)

  // const ipcHandle = (): void => window.electron.ipcRenderer.send('ping')
  return (
    <>
      <DraggableTopBar className="" />
      <RootLayout className="">
        <SideBar className="p-2  text-black"></SideBar>
        <Content className="border-l border-l-black/40 pt-[40px]">{renderView}</Content>
      </RootLayout>
    </>
  )
}

export default App
