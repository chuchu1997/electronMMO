import { ProxyType } from '@shared/models'
import { ActionButton, DropdownButton, InputComponent } from '../../components'
import { DropdownMenu } from '../../components/DropdownButton/DropdownMenu'
import { useState } from 'react'
export const ProxyView = () => {
  let ProxyOptions: ProxyType[] = [
    {
      proxyType: 'proxy-v4'
    },
    {
      proxyType: 'reverse-proxy'
    },
    { proxyType: 'http-proxy' }
  ]
  const [proxyType, setProxyType] = useState('Chọn Proxy Type')

  const [proxy, setProxy] = useState<ProxyType>({
    proxyType: 'proxy-v4',
    proxyIP: '',
    username: '',
    password: '',
    port: 0
  })
  const onCreateProxy = () => {}
  const onFormInputChange = (event) => {
    const { name, value } = event.target

    setProxy({ ...proxy, [name]: value })
  }
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2 shadow-md p-4 rounded-sm">
        <h2>Các Proxy của bạn:</h2>
        <p>Hiện chưa có proxy nào </p>
      </div>
      <div className="flex flex-col gap-2 shadow-md p-4 rounded-sm md:w-2/4 w-full mx-auto">
        <div>Thông tin proxy</div>
        <DropdownButton title={proxyType}>
          <DropdownMenu
            items={ProxyOptions.map((proxy1) => {
              return {
                label: proxy1.proxyType,
                onClick: () => {
                  setProxyType(proxy1.proxyType)
                  setProxy({
                    ...proxy,
                    proxyType: proxy1.proxyType
                  })
                }
              }
            })}
          ></DropdownMenu>
        </DropdownButton>
        <div className="grid grid-cols-2 gap-2">
          <InputComponent
            required
            placeholder="Proxy IP"
            name="proxyIP"
            onChange={onFormInputChange}
          />
          <InputComponent
            placeholder="Proxy UserName"
            name="username"
            onChange={onFormInputChange}
          />
          <InputComponent
            placeholder="Proxy Password"
            name="password"
            onChange={onFormInputChange}
          />
          <InputComponent placeholder="Proxy Port" name="port" onChange={onFormInputChange} />
        </div>
        <ActionButton onClick={() => onCreateProxy()}>Tạo mới proxy</ActionButton>
      </div>
    </div>
  )
}
