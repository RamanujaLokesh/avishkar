import React from "react";

const Footer = () => {
  return (
    <footer className="bg-blue-800 text-gray-300 text-sm">
      <div className="container mx-auto py-4 flex flex-col lg:flex-row items-center justify-between">
        <p className="mb-2 lg:mb-0 text-center lg:text-left">
          © 2024 MNNIT. All rights reserved.
        </p>

        <div className="flex space-x-4">
          <a
            href="/contact"
            className="hover:text-gray-100 transition-colors duration-200"
          >
            Contact Us
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
