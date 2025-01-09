import React, { useState } from 'react';
import Item1Image from '../images/new arrival1.webp';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

const Cart = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Function to handle order placement and open the modal
  const handlePlaceOrder = () => {
    setIsModalOpen(true);
  };

  // Function to close the modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Navbar />
      <div className="w-full min-h-screen bg-gray-100 p-6">
        
        {/* Title section */}
        <div className="text-center font-semibold text-lg mt-6 mb-6">
          MY BAG - - - - - - - - - - - - - ADDRESS - - - - - - - - - - - - - PAYMENT
        </div>

        {/* Content section */}
        <div className="border-t border-gray-300 pt-4 flex flex-col md:flex-row">
          {/* Left side - Cart items */}
          <div className="w-full md:w-3/5 pr-0 md:pr-6">
            <div className="ml-0 md:ml-[10%] border border-gray-300 bg-white rounded-lg p-4 mb-4 flex flex-col md:flex-row">
              {/* Item image */}
              <img
                src={Item1Image}
                alt="Item 1"
                className="mb-2 w-36 h-48 object-cover rounded"
              />

              {/* Item details */}
              <div className="flex-1">
                <div className="font-semibold ml-0 md:ml-10 text-lg">Iron Man: Arc Reactor Men Oversized Hoodies</div>
                <div className="mt-2 flex items-center">
                  <div className="ml-0 md:ml-10 mr-3">
                    Size: 
                    <select className="border rounded ml-2 px-2 py-1">
                      <option>M</option>
                      <option>L</option>
                      <option>XL</option>
                    </select>
                  </div>
                  <div>
                    Qty: 
                    <select className="border rounded px-2 py-1 ml-1">
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Price */}
              <div className="text-right font-semibold text-lg">
                ₹ 2199
                <div className="text-sm text-gray-500">MRP incl. of all taxes</div>
              </div>
            </div>
          </div>

          {/* Right side - Order summary and actions */}
          <div className="w-full md:w-2/5 pl-0 md:pl-6 mt-4 md:mt-0">
            {/* Place Order button */}
            <button 
              onClick={handlePlaceOrder} 
              className="w-full mb-4 bg-[#147879] text-white font-semibold py-2 rounded hover:bg-blue-700">
              Place Order
            </button>

            {/* Additional Options */}
            <div className="space-y-2 mb-6">
              <button className="w-full text-left p-2 border rounded-lg bg-white">Apply Coupon</button>
              <button className="w-full text-left p-2 border rounded-lg bg-white">Gift Voucher</button>
              <button className="w-full text-left p-2 border rounded-lg bg-white">Gift Wrap (₹ 25)</button>
              <button className="w-full text-left p-2 border rounded-lg bg-white">TSS Money / TSS Points</button>
            </div>

            {/* Billing Details */}
            <div className="border border-gray-300 rounded-lg bg-white p-4">
              <div className="font-semibold text-lg mb-2">Billing Details</div>
              <div className="flex justify-between text-sm mb-1">
                <span>Cart Total (Excl. of all taxes)</span>
                <span>₹ 1963.39</span>
              </div>
              <div className="flex justify-between text-sm mb-1">
                <span>GST</span>
                <span>₹ 235.61</span>
              </div>
              <div className="flex justify-between text-sm mb-1">
                <span>Shipping Charges</span>
                <span>₹ 50.00</span>
              </div>
              <div className="flex justify-between font-semibold text-lg mt-4">
                <span>Total Amount</span>
                <span>₹ 2199.00</span>
              </div>
            </div>

            {/* Bottom Place Order button */}
            <button 
              onClick={handlePlaceOrder} 
              className="w-full mt-4 bg-[#147879] text-white font-semibold py-2 rounded hover:bg-blue-700">
              Place Order
            </button>
          </div>
        </div>

        <div className="w-full bg-red-600 mt-10 text-white text-center py-4">
          <h1 className="text-lg font-bold">HOMEGROWN INDIAN BRAND</h1>
        </div>
        <div className="w-full text-center mt-5 font-bold text-4xl mb-3">Over 6 Million Happy Customers</div>
        <div className='mt-10'><Footer /></div>

        {/* Modal */}
        {isModalOpen && (
          <div 
            className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50" 
            onClick={handleCloseModal}
          >
            <div 
              className="bg-white rounded-lg p-6 w-11/12 md:w-1/3 mx-2 text-center shadow-lg" 
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-2xl font-semibold mb-4">Order Successfully Placed!</h2>
              <p className="text-gray-600">Thank you for your purchase. You will receive a confirmation email shortly.</p>
              <button 
                onClick={handleCloseModal} 
                className="mt-6 bg-[#147879] text-white font-semibold py-2 px-4 rounded hover:bg-green-600">
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;
