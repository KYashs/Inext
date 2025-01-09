import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-[#e6e7e9] text-black p-6">
      <div className="flex justify-between">
        {/* Column 1: Need Help */}
        <div>
          <h2 className="font-bold text-lg text-red-400">Need Help</h2>
          <ul className="mt-2">
            <li className="my-1"><a href="#" className="hover:underline">Contact Us</a></li>
            <li className="my-1"><a href="#" className="hover:underline">Track Order</a></li>
            <li className="my-1"><a href="#" className="hover:underline">Returns and Refund</a></li>
            <li className="my-1"><a href="#" className="hover:underline">FAQs</a></li>
            <li className="my-1"><a href="#" className="hover:underline">My Account</a></li>
          </ul>
        </div>

        {/* Column 2: Company */}
        <div>
          <h2 className="font-bold text-lg text-red-400">Company</h2>
          <ul className="mt-2">
            <li className="my-1"><a href="#" className="hover:underline">About Us</a></li>
            <li className="my-1"><a href="#" className="hover:underline">Careers</a></li>
            <li className="my-1"><a href="#" className="hover:underline">Gift Vouchers</a></li>
            <li className="my-1"><a href="#" className="hover:underline">Community Initiatives</a></li>
            <li className="my-1"><a href="#" className="hover:underline">Souled Army</a></li>
          </ul>
        </div>

        {/* Column 3: More Info */}
        <div>
          <h2 className="font-bold text-lg text-red-400">More Info</h2>
          <ul className="mt-2">
            <li className="my-1"><a href="#" className="hover:underline">T&C</a></li>
            <li className="my-1"><a href="#" className="hover:underline">Privacy Policy</a></li>
            <li className="my-1"><a href="#" className="hover:underline">Sitemap</a></li>
            <li className="my-1"><a href="#" className="hover:underline">Blogs</a></li>
          </ul>
        </div>

        {/* Column 4: Store Near Me */}
        <div>
          <h2 className="font-bold text-lg text-red-400">Store Near Me</h2>
          <ul className="mt-2">
            <li className="my-1"><a href="#" className="hover:underline">Mumbai</a></li>
            <li className="my-1"><a href="#" className="hover:underline">Pune</a></li>
            <li className="my-1"><a href="#" className="hover:underline">Indore</a></li>
            <li className="my-1"><a href="#" className="hover:underline">Bengaluru</a></li>
            <li className="my-1"><a href="#" className="hover:underline">View More</a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;