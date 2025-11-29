import React, { useState } from "react";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <a href="#home" className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
                YourBrand
              </span>
            </a>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <a
              href="#home"
              className="text-gray-700 hover:text-purple-600 px-3 py-2 rounded-md text-sm font-medium transition duration-300"
            >
              Home
            </a>
            <a
              href="#about"
              className="text-gray-700 hover:text-purple-600 px-3 py-2 rounded-md text-sm font-medium transition duration-300"
            >
              About
            </a>
            <a
              href="#services"
              className="text-gray-700 hover:text-purple-600 px-3 py-2 rounded-md text-sm font-medium transition duration-300"
            >
              Services
            </a>
            <a
              href="#portfolio"
              className="text-gray-700 hover:text-purple-600 px-3 py-2 rounded-md text-sm font-medium transition duration-300"
            >
              Portfolio
            </a>
            <a
              href="#contact"
              className="text-gray-700 hover:text-purple-600 px-3 py-2 rounded-md text-sm font-medium transition duration-300"
            >
              Contact
            </a>
          </div>

          {/* CTA Button - Desktop */}
          <div className="hidden md:flex items-center">
            <button className="bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white px-6 py-2 rounded-full text-sm font-medium transition duration-300 transform hover:scale-105 shadow-lg">
              Get Started
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-purple-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-purple-500 transition duration-300"
            >
              <svg
                className="h-6 w-6"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a
              href="#home"
              className="text-gray-700 hover:text-purple-600 block px-3 py-2 rounded-md text-base font-medium transition duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </a>
            <a
              href="#about"
              className="text-gray-700 hover:text-purple-600 block px-3 py-2 rounded-md text-base font-medium transition duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </a>
            <a
              href="#services"
              className="text-gray-700 hover:text-purple-600 block px-3 py-2 rounded-md text-base font-medium transition duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              Services
            </a>
            <a
              href="#portfolio"
              className="text-gray-700 hover:text-purple-600 block px-3 py-2 rounded-md text-base font-medium transition duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              Portfolio
            </a>
            <a
              href="#contact"
              className="text-gray-700 hover:text-purple-600 block px-3 py-2 rounded-md text-base font-medium transition duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </a>
            <div className="px-3 py-2">
              <button className="w-full bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white px-6 py-2 rounded-full text-base font-medium transition duration-300 transform hover:scale-105 shadow-lg">
                Get Started
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
