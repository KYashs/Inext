import React from 'react';
import { FaBox, FaPowerOff } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import logo from '../images/logo.png';
import Productlisting1 from './ProductForm';
import AvailableStock from './Avilablestock';




const Sidebar = ({ handlePageChange }) => {
  const navigate = useNavigate();

  const handleLinkClick = (page) => {
    const pages = {
      Productlisting: (
        <div>
          <Productlisting1/>        </div>
      ),
      AvailableStocks: (
        <div>
         <AvailableStock/>
        </div>
      ),
    };
    handlePageChange(page, pages[page]);
  };

  const logout = () => {
    sessionStorage.clear(); // Clear user data
    navigate('/'); // Redirect to login page
  };

  return (
    <div className="w-1/6 bg-blue-500 h-screen flex flex-col text-white">
      <div className="p-5 text-center">
        <img src={logo} alt="Logo" className="w-14 h-14 mx-auto" />
        <h4 className="text-xl font-bold mt-2">Souled Store</h4>
      </div>

      <nav className="flex-1 overflow-y-auto">
        <ul className="space-y-2 p-4">
          <li
            className="p-3 flex items-center cursor-pointer hover:bg-blue-400 rounded"
            onClick={() => handleLinkClick('Productlisting')}
          >
            <FaBox className="mr-3" /> Product Listing Men
          </li>

          <li
            className="p-3 flex items-center cursor-pointer hover:bg-blue-400 rounded"
            onClick={() => handleLinkClick('AvailableStocks')}
          >
            <FaBox className="mr-3" /> Available Stocks
          </li>

          <li
            className="p-3 flex items-center cursor-pointer hover:bg-blue-400 rounded"
            onClick={logout}
          >
            <FaPowerOff className="mr-3" /> Log Out
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
