import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import queryString from "query-string";

const Checkout = () => {
    const location = useLocation();
    const queryParams = queryString.parse(location.search);
  
  const navigate = useNavigate();
  
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [contactInfo, setContactInfo] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  
  useEffect(() => {
    // Check session storage for login status
    const sessionData = sessionStorage.getItem("userToken");
    setIsLoggedIn(!!sessionData);
  }, []);

  const handleLogin = () => {
    // Implement login logic here (e.g., API call for authentication)
    sessionStorage.setItem("userToken", "sampleToken"); 
    setIsLoggedIn(true);
  };

  const handlePayment = async () => {
    const options = {
      key: "rzp_test_7uOZSUAOJBrYul",
      amount: product.price * 100,
      currency: "INR",
      name: "Your Store Name",
      description: product.heading,
      handler: async (response) => {
        try {
          await axios.post(
            "http://localhost:5000/purchase",
            { productId: product.id, quantity: 1 }, // Add dynamic quantity if needed
            { headers: { Authorization: `Bearer ${sessionStorage.getItem("userToken")}` } }
          );
          alert("Order placed successfully!");
        } catch (error) {
          console.error("Purchase API error:", error);
        }
      },
      prefill: { contact: contactInfo },
      theme: { color: "#3399cc" },
    };
  
    const razorpay = new window.Razorpay(options);
    razorpay.open();
  };
  
  const product = {
    id: queryParams.productId,
    price: queryParams.price,
    heading: queryParams.heading,
  };
  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto p-8">
        {!isLoggedIn ? (
          <div className="border p-6 rounded shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Login or Sign Up</h2>
            <input
              type="text"
              placeholder="Enter mobile number or email"
              value={contactInfo}
              onChange={(e) => setContactInfo(e.target.value)}
              className="border p-2 w-full rounded"
            />
            <button
              onClick={handleLogin}
              className="bg-red-600 text-white px-4 py-2 mt-4 rounded w-full"
            >
              Continue
            </button>
          </div>
        ) : (
          <>
            {/* Delivery Address */}
            <div className="border p-6 rounded shadow-lg mb-6">
              <h2 className="text-xl font-semibold mb-4">Delivery Address</h2>
              <textarea
                placeholder="Enter your delivery address"
                value={deliveryAddress}
                onChange={(e) => setDeliveryAddress(e.target.value)}
                className="border p-2 w-full rounded"
              />
            </div>

            {/* Order Summary */}
            <div className="border p-6 rounded shadow-lg mb-6">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              <p>Product: {product.cloth_heading}</p>
              <p>Price: ₹{product.price}</p>
              <p className="font-bold">Total: ₹{product.price}</p>
            </div>

            {/* Payment Button */}
            <button
              onClick={handlePayment}
              className="bg-green-600 text-white px-4 py-2 rounded w-full"
            >
              Place Order
            </button>
          </>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Checkout;
