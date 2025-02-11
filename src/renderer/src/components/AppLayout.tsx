import { ComponentProps, forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'
import { ActionButton, SidebarButton } from './Button'
import { LuNetwork, LuPlus, LuUser, LuLayoutDashboard } from 'react-icons/lu'
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
  const ChromeFeatures = () => (
    <div className="collapse bg-accent rounded-md text-white ">
      <input type="checkbox" />
      <div className="collapse-title ">Tools Chrome</div>
      <div className="collapse-content">
        <div>
          <SidebarButton
            title="Tạo mới Profile"
            icon={<LuPlus />}
            onClick={() => onDispatchChangeView('create-profile')}
          ></SidebarButton>
          <SidebarButton
            title="Quản lý profiles"
            icon={<LuUser />}
            onClick={() => onDispatchChangeView('manage-profile')}
          ></SidebarButton>
        </div>
      </div>
    </div>
  )
  return (
    <aside className={twMerge('w-[280px] h-[100vh +10px] overflow-auto', className)} {...props}>
      <header className="p-4 mb-4">
        <h3 className="text-2xl text-gray-900 font-bold text-center tracking-tight italic ">
          NC Tools
        </h3>
      </header>
      <div className="flex flex-col gap-4 ">
        <ChromeFeatures />
        <SidebarButton
          title="Dashboard"
          icon={<LuLayoutDashboard />}
          onClick={() => onDispatchChangeView('dashboard')}
        ></SidebarButton>

        <SidebarButton
          title="Quản lý proxy"
          icon={<LuNetwork />}
          onClick={() => onDispatchChangeView('manage-proxy')}
        ></SidebarButton>
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
