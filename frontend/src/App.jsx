import { Route, Routes, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import ForgetPassword from "./pages/ForgetPassword.jsx";
import { useAuthContext } from "./context/AuthContext.jsx";

import "./App.css";
import ResetPassword from "./pages/ResetPassword.jsx";
import NoticePage from "./pages/NoticePage.jsx";
import Menu from "./pages/MessMenu.jsx";
import ConferenceRoom from "./pages/ConferenceRoom.jsx";
import UnRegStudents from "./pages/UnRegStudents.jsx";
import Page404 from "./pages/Page404.jsx";
import ComplaintPage from "./pages/ComplaintPage.jsx";

import NoticeUpload from "./pages/NoticeUpload.jsx";

import Complaints from "./pages/Complaints.jsx";
import Navbar from "./components/navbar.jsx";
import Footer from "./components/footer.jsx";

function App() {
  const { authUser } = useAuthContext();

  return (
    
    <div className="bg-gray-200">
       {authUser&&<Navbar />}

      <Routes>
        <Route
          path="/"
          element={
            !authUser ? (
              <Navigate to="/login" />
            ) : authUser.auth_level === 1 ? (
              <Home />
            ) : (
              <Navigate to="/complaints" />
            )
          }
        />
        <Route
          path="/login"
          element={authUser ? <Navigate to="/" /> : <Login />}
        />
        <Route
          path="/forgetpassword"
          element={authUser ? <Navigate to="/" /> : <ForgetPassword />}
        />
        <Route path="/resetpassword/:token" element={<ResetPassword />} />
        <Route
          path="/notice"
          element={!authUser ? <Navigate to="/login" /> : <NoticePage />}
        />
        <Route
          path="/messmenu"
          element={!authUser ? <Navigate to="/login" /> : <Menu />}
        />
        <Route
          path="/chat"
          element={!authUser ? <Navigate to="/login" /> : <ConferenceRoom />}
        />
        <Route
          path="/unregstudents"
          element={authUser?.auth_level > 1 ? <UnRegStudents /> : <Login />}
        />

        <Route
          path="/complaint"
          element={
            !authUser || authUser?.auth_level > 1 ? (
              <Navigate to="/login" />
            ) : (
              <ComplaintPage />
            )
          }
        />
        <Route
          path="/complaints"
          element={
            !authUser || authUser?.auth_level === 1 ? (
              <Navigate to="/login" />
            ) : (
              <Complaints />
            )
          }
        />
        <Route
          path="/noticeupload"
          element={
            !authUser?.auth_level > 1 ? (
              <Navigate to="/login" />
            ) : (
              <NoticeUpload />
            )
          }
        />
        <Route path="*" element={<Page404 />} />
      </Routes>

      {authUser&&<Footer />}

      <Toaster />
    </div>
  );
}

export default App;
