import { toast, ToastPosition } from 'react-toastify'

interface ToastType {
  message: string
  position?: ToastPosition
}
export const CustomToast = {
  success: ({ message, position }: ToastType) => {
    toast.success(message, {
      position: position ?? 'top-center',
      autoClose: 1500, // Time before the toast disappears
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined
    })
  },

  error: ({ message }) => {
    toast.error(message, {
      position: 'top-center',
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined
    })
  }

  //   info: () => {
  //     toast.info('This is an info toast!', {
  //       position: 'top-center',
  //       autoClose: 1500,
  //       hideProgressBar: false,
  //       closeOnClick: true,
  //       pauseOnHover: true,
  //       draggable: true,
  //       progress: undefined
  //     })
  //   },

  //   warning: () => {
  //     toast.warn('This is a warning toast!', {
  //       position: 'top-center',
  //       autoClose: 1500,
  //       hideProgressBar: false,
  //       closeOnClick: true,
  //       pauseOnHover: true,
  //       draggable: true,
  //       progress: undefined
  //     })
  //   }
}
