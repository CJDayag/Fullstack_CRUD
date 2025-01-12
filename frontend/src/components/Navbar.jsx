import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function Navbar() {
  const location = useLocation();

  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold text-gray-800 hover:text-gray-500 hover:underline">
              Task Manager
            </Link>
          </div>
          
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
