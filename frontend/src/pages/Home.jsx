import Navbar from '../components/navbar.jsx';
import Mealplan from '../components/mealplan.jsx';
import Footer from '../components/footer.jsx';

function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-16 pb-20"> 
        <Mealplan />
      </main>
      <Footer />
    </div>
  );
}

export default Home
