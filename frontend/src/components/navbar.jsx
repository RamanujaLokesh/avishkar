import { useState } from "react";
import { Link } from "react-router-dom";
import useLogout from "../hooks/useLogout";
import { useAuthContext } from "../context/AuthContext";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { loading, logout } = useLogout();
  const { authUser } = useAuthContext();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleProfile = () => setIsProfileOpen(!isProfileOpen);

  return (
    <nav className="bg-blue-900 text-white shadow-lg">
      <div className="container mx-auto flex items-center justify-between p-4">
        <Link to="/" className="text-2xl font-bold">
          MNNIT
        </Link>

        <div className="hidden lg:flex gap-8">
          <Link to="/" className="hover:text-gray-200">Home</Link>
          <Link to="/notice" className="hover:text-gray-200">Notice</Link>
          <Link to="/messmenu" className="hover:text-gray-200">Mess-Menu</Link>
          <Link to="/chat" className="hover:text-gray-200">Conference</Link>
          {authUser.auth_level>1&&
          <Link to="/unregstudents" className="hover:text-gray-200">Unregistered Students</Link>
          }
          {authUser.auth_level ===1 &&
          <Link to='/complaint' >Complaint</Link>
          }
        
        </div>

        <div className="relative">
          <button
            onClick={toggleProfile}
            className="flex items-center gap-2 hover:text-gray-200 focus:outline-none"
          >
            
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-white rounded-full border-2 border-white"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 9a3 3 0 10-6 0 3 3 0 006 0zM4 12a6 6 0 0112 0v2a6 6 0 01-12 0v-2z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          {isProfileOpen && (
            <div className="absolute right-0 mt-2 bg-blue-50 text-blue-900 rounded-lg shadow-lg w-56 z-20">
              <div className="p-4">
                <p className="text-sm"><strong>Name:</strong> {authUser?.name}</p>
                <p className="text-sm"><strong>Email:</strong> {authUser?.clg_mail}</p>
                <button
                  className="btn btn-primary w-full mt-3"
                  onClick={logout}
                >
                  {loading ? (
                    <span className="loading loading-spinner"></span>
                  ) : (
                    "Logout"
                  )}
                </button>
              </div>
            </div>
          )}
        </div>

        <button
          onClick={toggleMenu}
          className="lg:hidden flex flex-col items-center justify-center gap-1 focus:outline-none"
        >
          <span className="block w-8 h-0.5 bg-white"></span>
          <span className="block w-8 h-0.5 bg-white"></span>
          <span className="block w-8 h-0.5 bg-white"></span>
        </button>
      </div>

      {isMenuOpen && (
        <div className="lg:hidden bg-blue-600 text-white">
          <div className="flex flex-col items-center gap-4 p-4">
            <Link to="/" className="hover:text-gray-200">Home</Link>
            <Link to="/notice" className="hover:text-gray-200">Notice</Link>
            <Link to="/messmenu" className="hover:text-gray-200">Mess-Menu</Link>
            <Link to="/chat" className="hover:text-gray-200">Conference</Link>
            {authUser.auth_level>1&&
          <Link to="/unregstudents" className="hover:text-gray-200">Unregistered Students</Link>
          }
           {authUser.auth_level ===1 &&
          <Link to='/complaint' >Complaint</Link>
          }
           
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
