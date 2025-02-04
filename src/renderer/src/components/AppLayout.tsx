import { ComponentProps, forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'
import { ActionButton, SidebarButton } from './Button'
import { LuNetwork, LuPlus, LuUser } from 'react-icons/lu'
import { useStoreCallback } from '../redux/callback'

export const RootLayout = ({ className, children, ...props }: ComponentProps<'main'>) => {
  return (
    <main className={twMerge('h-screen flex flex-row', className)} {...props}>
      {children}
    </main>
  )
}

export const SideBar = ({ className, ...props }: ComponentProps<'aside'>) => {
  const { onDispatchChangeView } = useStoreCallback()

  return (
    <aside className={twMerge('w-[200px] h-[100vh +10px] overflow-auto', className)} {...props}>
      <header className="p-4 mb-4">Nguyen Cuong Tool</header>
      <div className="flex flex-col gap-4 ">
        <SidebarButton
          title="Tạo mới profile"
          icon={<LuPlus />}
          onClick={() => onDispatchChangeView('create-profile')}
        ></SidebarButton>

        <SidebarButton
          title="Quản lý profile"
          icon={<LuUser />}
          onClick={() => onDispatchChangeView('manage-profile')}
        ></SidebarButton>

        <SidebarButton
          title="Quản lý proxy"
          icon={<LuNetwork />}
          onClick={() => onDispatchChangeView('manage-proxy')}
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
