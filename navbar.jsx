import React, { useState } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const user = { name: "Likhith Usirikayala", email: "usirikayala.20223295@mnnit.ac.in" };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  return (
    <nav className="flex items-center justify-between p-4 bg-neutral text-neutral-content">
      <div className="text-xl font-bold">MNNIT</div>
      <div className={`flex gap-4 ${isOpen ? 'flex-col' : 'hidden'} lg:flex`}>
        <a href="#home" className="hover:text-gray-400">Home</a>
        <a href="#about" className="hover:text-gray-400">About</a>
        <a href="#mess-menu" className="hover:text-gray-400">Mess-Menu</a>
        
        <div className="relative cursor-pointer" onClick={toggleProfile}>
          <span>{user.name}</span>
          {isProfileOpen && (
            <div className="absolute right-0 mt-2 bg-base-200 text-base-content rounded-lg p-4 shadow-lg w-48 z-20">
              <p><strong>Name:</strong> {user.name}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <button className="btn btn-primary w-full mt-2">Logout</button>
            </div>
          )}
        </div>
      </div>
      <div className="lg:hidden flex flex-col cursor-pointer" onClick={toggleMenu}>
        <span className="block w-8 h-0.5 bg-neutral-content mb-1"></span>
        <span className="block w-8 h-0.5 bg-neutral-content mb-1"></span>
        <span className="block w-8 h-0.5 bg-neutral-content"></span>
      </div>
    </nav>
  );
};

export default Navbar;
