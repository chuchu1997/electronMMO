import { useState } from 'react'
import { ActionButton } from '../../Button'
import { DropdownButton } from '../../DropdownButton'
import { DropdownMenu } from '../../DropdownButton/DropdownMenu'
import { InputComponent } from '../../Input'
import { useStoreCallback } from '../../../redux/callback'
export const InternetProxy = () => {
  const listProxyTypes = ['HTTP Proxy', 'SOCKS4 Proxy', 'SOCKS5 Proxy', 'TM PROXY', 'Tin Proxy']
  const { createUserProfileStateSelector, onDispatchUpdateCreateUserProfile } = useStoreCallback()
  // const [proxyType, setProxyType] = useState('Chọn loại proxy')

  return (
    <div className="flex flex-col gap-2">
      <DropdownButton title={createUserProfileStateSelector.proxy?.proxyType ?? ''}>
        <DropdownMenu
          items={[
            ...listProxyTypes.map((proxyType) => {
              return {
                label: proxyType,
                onClick: () => {
                  createUserProfileStateSelector.proxy!.proxyType = proxyType
                  onDispatchUpdateCreateUserProfile({
                    ...createUserProfileStateSelector,
                    proxy: createUserProfileStateSelector.proxy
                  })
                }
              }
            })
          ]}
        />
      </DropdownButton>

      <div className="grid grid-cols-2 gap-4 mt-[30px]">
        <InputComponent placeholder="Máy chủ" />
        <InputComponent placeholder="Cổng Proxy (PORT)" />
        <InputComponent placeholder="Tên người dùng" />
        <InputComponent placeholder="Mật khẩu" />
        <ActionButton>Kiểm tra proxy</ActionButton>
      </div>
    </div>
  )
}
