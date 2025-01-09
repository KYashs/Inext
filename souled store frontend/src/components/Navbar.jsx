import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaretDown,
  faHeart,
  faMagnifyingGlass,
  faShoppingCart,
  faUser,
  faBars,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import Logo from "../images/logo.png";
import { Link } from "react-router-dom";
import axios from "axios";  // Import axios

const Navbar = () => {
  const [activeTab, setActiveTab] = useState("men");
  const [dropdownOpen, setDropdownOpen] = useState({});
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false); // State to manage user menu visibility

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const toggleDropdown = (item) => {
    setDropdownOpen((prev) => ({ ...prev, [item]: !prev[item] }));
  };

  const handleMouseEnter = (item) => {
    setDropdownOpen((prev) => ({ ...prev, [item]: true }));
  };

  const handleMouseLeave = (item) => {
    setDropdownOpen((prev) => ({ ...prev, [item]: false }));
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const toggleUserMenu = () => {
    setUserMenuOpen(!userMenuOpen); // Toggle the user menu visibility
  };

  const handleLogout = async () => {
    try {
      const token = sessionStorage.getItem("token");  // Get token from session storage
      if (token) {
        const response = await axios.post("http://localhost:5000/logout", 
          { token },  // Send token as JSON in the body
          {
            headers: {
              "Content-Type": "application/json",  // Ensure the server expects JSON
            },
          }
        );
        console.log("Logout successful:", response.data);
        sessionStorage.removeItem("token");  // Remove token from session storage
        window.location.href = "/";  // Redirect to login page or another page
      } else {
        console.error("No token found in session storage.");
      }
    } catch (error) {
      console.error("Error logging out:", error.response?.data || error.message);
    }
  };
  
  console.log(sessionStorage.token)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative">
      {/* Logo positioned above the navbars */}
      <div
        className={`${
          isScrolled ? "fixed top-0 left-4 md:left-10 z-40" : "absolute mt-6"
        } transform transition-transform duration-300`}
      >
        <Link to="/home">
          <img
            src={Logo}
            alt="Logo"
            className={`${
              isScrolled ? "w-11 md:w-16" : "w-16 md:w-24"
            } h-auto transition-transform duration-300`}
          />
        </Link>
      </div>

      {/* Mobile Menu Toggle */}
      <button
        className="md:hidden absolute top-0 right-4 mt-6 text-white z-30"
        onClick={toggleMobileMenu}
      >
        <FontAwesomeIcon icon={mobileMenuOpen ? faTimes : faBars} size="lg" />
      </button>

      {/* Main Navbar */}
      <nav className="flex flex-col md:flex-row items-center justify-between bg-red-500 p-2">
        <div className="flex items-center space-x-4 md:space-x-8 md:ml-40">
          {["women", "kids", "men"].map((tab) => (
            <a
              key={tab}
              href={`#${tab}`}
              onClick={() => handleTabClick(tab)}
              className={`text-gray-500 ${
                activeTab === tab ? "bg-white text-red-500 font-semibold" : ""
              } p-2 rounded text-sm md:text-base`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </a>
          ))}
        </div>
        <div className="hidden md:flex items-center space-x-8 mr-10">
          {["India", "Track Order", "Contact Us", "Download App"].map(
            (item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(" ", "-")}`}
                className="text-white hover:text-gray-900 text-sm md:text-base"
              >
                {item}
              </a>
            )
          )}
        </div>
      </nav>

      {/* Secondary Navbar with Dropdowns */}
      <nav
        className={`${
          mobileMenuOpen ? "block" : "hidden"
        } md:flex p-4 md:p-4 mt-2 md:mt-0 ${
          isScrolled ? "fixed top-0 left-0 right-0 z-30 bg-white" : "bg-white"
        } text-black transition-all duration-300`}
      >
        <div className="flex flex-col md:flex-row items-center md:justify-between w-full">
          <div className="flex flex-col md:flex-row space-y-2 ml-40 md:space-y-0 md:space-x-8">
            {[
              "Winters24",
              "Topwear",
              "Bottomwear",
              "Bestsellers New",
              "Sneakers",
              "Accessories",
              "Collections",
              "Themes",
              "Membership",
            ].map((item) => (
              <div
                key={item}
                className="relative"
                onMouseEnter={() => handleMouseEnter(item)}
                onMouseLeave={() => handleMouseLeave(item)}
              >
                <button className="font-bold text-sm hover:text-gray-700 focus:outline-none flex items-center">
                  {item}
                  <FontAwesomeIcon icon={faCaretDown} className="ml-1" />
                </button>
                {dropdownOpen[item] && (
                  <div className="absolute left-0 mt-2 w-48 bg-white border border-gray-300 rounded shadow-lg z-20">
                    <div className="px-4 py-2 hover:bg-gray-100">Dropdown 1</div>
                    <div className="px-4 py-2 hover:bg-gray-100">Dropdown 2</div>
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <button className="font-bold text-sm hover:text-gray-700">
              <FontAwesomeIcon icon={faMagnifyingGlass} className="text-xl" />
            </button>
            <div className="relative">
              <button
                className="font-bold text-sm hover:text-gray-700"
                onClick={toggleUserMenu} // Toggle user menu visibility
              >
                <FontAwesomeIcon icon={faUser} className="text-xl" />
              </button>
              {userMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded shadow-lg z-20">
                  <button
                    className="block px-4 py-2 hover:bg-gray-100"
                    onClick={handleLogout} // Call handleLogout on click
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
            <button className="font-bold text-sm hover:text-gray-700">
              <FontAwesomeIcon icon={faHeart} className="text-xl" />
            </button>
            <button className="font-bold text-sm hover:text-gray-700">
              <FontAwesomeIcon icon={faShoppingCart} className="text-xl" />
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
