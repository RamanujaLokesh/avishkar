import Navbar from '../components/navbar.jsx';
import NoticeBoard from '../components/NoticeBoard.jsx';
import Footer from '../components/footer.jsx';
import { useAuthContext } from '../context/AuthContext.jsx';
import { useState } from 'react';
import SelectHostel from '../components/SelectHostel.jsx';
import NoticeUpload from './NoticeUpload.jsx';
import { Link } from 'react-router-dom';

function NoticePage() {
  const {authUser} = useAuthContext()
  const [selectedHostel , setSelectedHostel] = useState(authUser.hostel);
  const onSelectHostel = (hostel)=>{
    setSelectedHostel(hostel);
  }
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      
      
{authUser.auth_level===3&&<SelectHostel onSelectHostel={onSelectHostel} />}
{authUser.auth_level>1&&<Link to='/noticeupload' > <button
              type="submit"
              className="py-2 px-4 bg-blue-500 text-white font-semibold rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >Upload Notice</button></Link>}
      <main className="flex-grow">
        <div className="container mx-auto p-6">
         {
selectedHostel !=='All'
         && <NoticeBoard hostel={selectedHostel} />
         }
        </div>
      </main>


      
      
    </div>
  );
}

export default NoticePage;
