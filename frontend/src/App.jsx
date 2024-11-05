import { Route, Routes, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import ForgetPassword from './pages/ForgetPassword.jsx';
import { useAuthContext } from './context/AuthContext.jsx';

import './App.css';
import ResetPassword from './pages/ResetPassword.jsx';
import NoticePage from './pages/NoticePage.jsx';
import Menu from './pages/menu/Menu.jsx';

function App() {
  const { authUser } = useAuthContext();

  return (
    <div>
  
      <Routes>
      <Route path='/' element={!authUser?<Navigate to='/login' />:<Home />} />
      <Route path="/login" element={authUser? <Navigate to='/' />:<Login />} />
      <Route path="/forgetpassword" element={authUser? <Navigate to='/' />:<ForgetPassword />} />
      <Route path='/notice' element={!authUser?<Navigate to='/login' />:<NoticePage />} />
      <Route path='/messmenu' element={!authUser?<Navigate to='/login' />:<Menu />} />
    
       
      <Route path='/resetpassword/:token' element={<ResetPassword />} />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
