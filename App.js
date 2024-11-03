import React from 'react';
import Navbar from './components/homecomponents/navbar';
import Mealplan from './components/homecomponents/mealplan';
import Footer from './components/homecomponents/footer';

function App() {
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

export default App;
