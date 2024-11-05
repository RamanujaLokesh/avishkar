import Navbar from '../components/navbar.jsx';
import NoticeBoard from '../components/NoticeBoard.jsx';
import Footer from '../components/footer.jsx';

function NoticePage(){
    return(
        <div>
        <Navbar />
       
          <NoticeBoard/>
        
        <Footer />
      </div>
    );
}

export default NoticePage;