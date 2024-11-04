import { useState } from 'react'
import { Toaster } from 'react-hot-toast'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import ResetPassword from './pages/resetpassword/ResetPassword.jsx'
import Home from './pages/home/home.jsx'


import './App.css'
function App() {
  const router = createBrowserRouter([
    {path:"/",
      element:<Home />
    },
    {path:"/resetpassword/:token",
      element:<ResetPassword />
    }
  ])
 

  return (
    <div className='p-4 h-screen flex items-center justify-center'>

<RouterProvider router={router}
/>
    </div>
  )
}

export default App
