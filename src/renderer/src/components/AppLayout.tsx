import { ComponentProps, forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'
import { ActionButton, SidebarButton } from './Button'
// import { chromesProfileMock } from '../store/mocks'
import { useDispatch, useSelector } from 'react-redux'
import { updateView } from '../redux/actions'
// import { setMessage, setView } from '../redux/actions'
// import { StoreStateType } from '../redux/reducers'

// import { chromesProfileMock } from '@renderer/store/mocks'
// import { cn, formatDateFromMS } from '@renderer/utils'

export const RootLayout = ({ className, children, ...props }: ComponentProps<'main'>) => {
  return (
    <main className={twMerge('h-screen flex flex-row', className)} {...props}>
      {children}
    </main>
  )
}

export const SideBar = ({ className, ...props }: ComponentProps<'aside'>) => {
  const dispatch = useDispatch()

  const handleChangeView = (viewChange: any) => {
    dispatch(updateView({ view: viewChange }))
  }
  return (
    <aside className={twMerge('w-[200px] h-[100vh +10px] overflow-auto', className)} {...props}>
      <header className="p-4 mb-4">Nguyen Cuong Tool</header>
      <div className="flex flex-col gap-4 ">
        <SidebarButton
          mode="create-profile"
          onClick={() => {
            handleChangeView('create-profile')
          }}
        ></SidebarButton>
        <SidebarButton
          mode="manage-profile"
          onClick={() => {
            handleChangeView('dashboard')
          }}
        ></SidebarButton>
        <ActionButton
          onClick={() => {
            // handleChangeView({ view: 'home' })
          }}
        >
          HUHU
        </ActionButton>
      </div>
    </aside>
  )
}

export const Content = forwardRef<HTMLDivElement, ComponentProps<'div'>>(
  ({ children, className, ...props }, ref) => (
    <div ref={ref} className={twMerge('flex-1 h-full overflow-auto', className)} {...props}>
      {children}
    </div>
  )
)

Content.displayName = 'Content'
