import { TabsComponent } from '../TabsComponent'
import { InternetProxy } from './InternetProxy'

export const InternetBrowser = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="internet-info border border-gray-200 rounded-sm p-4">
        <div className="flex flex-col gap-2">
          <h1>Loại proxy</h1>
          <TabsComponent
            name="proxy-tabs"
            tabs={[
              {
                title: 'Proxy của bạn',
                content: <InternetProxy />
              }
            ]}
          />
        </div>
      </div>
    </div>
  )
}
