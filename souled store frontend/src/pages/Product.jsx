import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faInstagram, faWhatsapp } from "@fortawesome/free-brands-svg-icons";

const Product = () => {
  const { id } = useParams(); // Get the product ID from the URL
  const [product, setProduct] = useState(null);

  useEffect(() => {
    // Fetch product details using the product ID
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };
    fetchProduct();
  }, [id]);

  if (!product) {
    return (
      <div>
        <Navbar />
        <div className="text-center mt-20 text-gray-600">Loading...</div>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="flex flex-col md:flex-row p-8">
        {/* Left Side - Images */}
        <div className="w-full md:w-3/5 grid grid-cols-2 gap-4 pr-4">
          {product.images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Product Image ${index + 1}`}
              className="mb-2 w-full h-fit object-cover rounded"
            />
          ))}
        </div>

        {/* Right Side - Product Details */}
        <div className="w-full md:w-2/5 space-y-4 ml-44 mt-4 md:mt-0">
          <h2 className="text-2xl font-semibold">{product.cloth_heading}</h2>
          <p className="text-lg font-medium">{product.category}</p>
          <p className="text-xl font-bold text-red-600">₹{product.price}</p>
          <p className="text-gray-500">MRP incl. of all taxes</p>

          {/* Size Selection */}
          <div>
            <p>
              Selected Size: <span className="font-semibold">{product.size}</span>
            </p>
          </div>

          {/* Quantity & Stock */}
          <div>
            <p>
              Stock Available: <span className="font-semibold">{product.stock}</span>
            </p>
            <p>
              Product Id: <span className="font-semibold">{product.id}</span>
            </p>

            <div className="flex items-center space-x-2">
              <label htmlFor="quantity" className="font-semibold">
                Quantity
              </label>
              <select id="quantity" className="border px-3 py-1 rounded">
                {[1, 2, 3, 4, 5].map((qty) => (
                  <option key={qty} value={qty}>
                    {qty}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4 mt-4">
            <Link
              to={`/checkout?productId=${product.id}&price=${product.price}&heading=${encodeURIComponent(
                product.cloth_heading
              )}`}
            >
              <button className="bg-red-600 text-white px-4 py-2 rounded">Buy Now</button>
            </Link>
          </div>

          {/* Share Section */}
          <div className="flex items-center space-x-4 mt-4">
            <span className="font-semibold">Share:</span>
            <FontAwesomeIcon className="text-green-400" icon={faWhatsapp} />
            <FontAwesomeIcon className="text-[#e4405f]" icon={faInstagram} />
            <FontAwesomeIcon className="text-blue-700" icon={faFacebook} />
          </div>

          {/* Product Description */}
          <div className="mt-4">
            <h3 className="font-semibold">Product Description</h3>
            <p>{product.description}</p>
          </div>

          {/* Delivery Details */}
          <div className="mt-4">
            <h3 className="font-semibold">Delivery Details</h3>
            <input
              type="text"
              placeholder="Enter your pincode"
              className="border p-2 w-full mt-2 rounded"
            />
          </div>

          {/* Product Details Box */}
          <div className="border p-4 mt-4 rounded bg-gray-50">
            <h3 className="font-semibold text-lg mb-2">Product Details</h3>
            <p>
              <strong>Gender:</strong> {product.gender}
            </p>
            <p>
              <strong>Material & Care:</strong> Cotton
            </p>
            <p className="mt-4">
              <strong>Country of Origin:</strong> India
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Product;
