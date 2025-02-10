import { useEffect } from 'react'
import { useStoreCallback } from '../redux/callback'
import { LuArrowRight, LuVideo, LuChrome } from 'react-icons/lu'
import { ActionButton } from '../components'
export const DashboardView = () => {
  const { onDispatchUpdateChromeStateFromProfile } = useStoreCallback()
  const readInformationChromeProfilesInExcelFile = async () => {
    let result = await window.electron.readChromeProfilesFromExcel()
    //
    if (result.status == 200) {
      onDispatchUpdateChromeStateFromProfile(result.profiles)
      //
      // setProfiles(result.profiles)
    }
  }

  useEffect(() => {
    readInformationChromeProfilesInExcelFile()
  }, [])
  const BoxFeature = () => (
    <div className="flex flex-col items-start gap-4 rounded-2xl border border-gray-200 p-8 hover:border-gray-300 transition-colors">
      <div className="icon-wrapper inline-flex items-center justify-center rounded-lg bg-gray-50 p-3">
        <LuChrome size={20} />
      </div>
      <h2 className="title  text-xl font-semibold text-gray-900">Video processing</h2>
      <p className="description text-gray-600">
        Upload and automatically trim long videos into shorter, more engaging content perfect for
        sharing.
      </p>
      <div className="flex w-full justify-end mt-4">
        <ActionButton className="p-3  ">
          <div className="flex items-center gap-2">
            <span> Vào Xem</span>
            <LuArrowRight />
          </div>
        </ActionButton>
      </div>
    </div>
  )

  // const ChatGPT = () => (
  //   <div className="bg-[radial-gradient(circle,_rgba(52,51,49,0.85)_10%,_rgba(42,42,42,0.85)_90%)] text-white min-h-screen p-6 flex flex-col">
  //     {/* Navbar */}
  //     <nav className="fixed top-0 w-full bg-[#626260] bg-opacity-80 backdrop-blur-md p-4 flex justify-between items-center shadow-lg z-50 rounded-xl">
  //       <div className="flex space-x-6 text-white font-semibold">
  //         <a href="#" className="hover:text-[#FFA500]">
  //           Properties List
  //         </a>
  //         <a href="#" className="hover:text-[#FFA500]">
  //           Analytics
  //         </a>
  //         <a href="#" className="hover:text-[#FFA500]">
  //           Tools & Calculators
  //         </a>
  //       </div>
  //     </nav>

  //     {/* Dashboard Content */}
  //     <div className="pt-20 grid grid-cols-3 gap-6">
  //       {/* Cards */}
  //       <div className="bg-[radial-gradient(circle,_rgba(98,98,96,0.85)_10%,_rgba(50,50,50,0.85)_90%)] backdrop-blur-lg p-6 rounded-2xl shadow-md border border-gray-700">
  //         <h2 className="text-lg font-semibold">Properties Visits</h2>
  //         <p className="text-[#4abd50] text-2xl font-bold">
  //           721K <span className="text-sm">+11.01%</span>
  //         </p>
  //       </div>
  //       <div className="bg-[radial-gradient(circle,_rgba(98,98,96,0.85)_10%,_rgba(50,50,50,0.85)_90%)] backdrop-blur-lg p-6 rounded-2xl shadow-md border border-gray-700">
  //         <h2 className="text-lg font-semibold">Deals Completed</h2>
  //         <p className="text-[#4abd50] text-2xl font-bold">
  //           1,156 <span className="text-sm">+11.01%</span>
  //         </p>
  //       </div>
  //       <div className="bg-[radial-gradient(circle,_rgba(98,98,96,0.85)_10%,_rgba(50,50,50,0.85)_90%)] backdrop-blur-lg p-6 rounded-2xl shadow-md border border-gray-700">
  //         <h2 className="text-lg font-semibold">Mortgage Payment</h2>
  //         <p className="text-white">Biểu đồ sẽ hiển thị ở đây.</p>
  //       </div>
  //     </div>
  //   </div>
  // )
  return (
    // <ChatGPT />
    <div className="wrapper flex flex-col gap-4">
      <div className="introduce flex flex-col text-center">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          Automation Tools Was Developed By Nguyen Cuong
        </h1>
        <p className="text-lg text-gray-600 leading-8 mt-4">Các tools liên quan tới mãng (MMO)</p>
        <ul className="text-normal mt-2">
          <span className="font-bold">Liên hệ: </span>
          <li className="text-sm">Gmail:tuilanguyencuong@gmail.com</li>
          <li className="text-sm">Facebook:facebook.com/Modimotoj</li>
          <li className="text-sm">Hotline: 0325805893 (Cường)</li>
        </ul>
      </div>

      <div className="box-feature mt-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <BoxFeature />
          <BoxFeature />
          <BoxFeature />
        </div>
      </div>
    </div>
  )
}
