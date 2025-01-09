import React, { useState, useRef } from "react";
import axios from "axios";
import { FaTrash } from "react-icons/fa";

function Addproducts() {
  const [files, setFiles] = useState([]); // Multiple files for images
  const [carData, setCarData] = useState({
    gender: "",
    size: "",
    description: "",
    price: "",
    category: "",
    quantity: "",
    cloth_heading: "",
  });
  const [imagePreviews, setImagePreviews] = useState([]); // Multiple previews

  const imageInputRef = useRef(null);

  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files);
    setFiles((prevFiles) => [...prevFiles, ...newFiles]);
    const newPreviews = newFiles.map((file) => URL.createObjectURL(file));
    setImagePreviews((prevPreviews) => [...prevPreviews, ...newPreviews]);
  };

  const handleRemoveImage = (index) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
    setImagePreviews((prevPreviews) =>
      prevPreviews.filter((_, i) => i !== index)
    );
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCarData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    // Append text fields
    Object.keys(carData).forEach((key) => {
      formData.append(key, carData[key]);
    });

    // Append images
    files.forEach((file) => {
      formData.append("images", file);
    });

    try {
      // Retrieve the token from sessionStorage
      const token = sessionStorage.getItem("token");

      if (!token) {
        alert("User is not authenticated. Please log in.");
        return;
      }

      const response = await axios.post("http://localhost:5000/products", formData, {
        headers: {
          "Authorization": `Bearer ${token}`, // Use the token from sessionStorage
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Product added successfully:", response.data);
      alert("Product added successfully!");
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Failed to add product. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center mt-10">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Add Product</h1>

      <button
        type="button"
        onClick={() => imageInputRef.current.click()}
        className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none mb-4"
      >
        Select Images
      </button>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-4xl bg-white p-8 rounded-lg shadow-md"
      >
        {/* Image Upload */}
        <input
          type="file"
          accept="image/*"
          multiple
          ref={imageInputRef}
          onChange={handleFileChange}
          className="hidden"
        />
        <div className="flex flex-wrap mt-4">
          {imagePreviews.map((preview, index) => (
            <div key={index} className="relative w-32 h-32 mr-4 mb-4">
              <img
                src={preview}
                alt={`Selected Image ${index + 1}`}
                className="w-full h-full object-cover rounded-md border-2 border-blue-500"
              />
              <button
                type="button"
                className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                onClick={() => handleRemoveImage(index)}
              >
                <FaTrash size={14} />
              </button>
            </div>
          ))}
        </div>

        {/* Form Fields */}
        <div className="space-y-6">
          <div className="flex items-center">
            <label className="w-1/3 text-gray-700 font-medium">Gender</label>
            <select
              name="gender"
              value={carData.gender}
              onChange={handleChange}
              className="w-2/3 p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200"
            >
              <option value="" disabled>
                Select Gender
              </option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Kids">Kids</option>
            </select>
          </div>

          <div className="flex items-center">
            <label className="w-1/3 text-gray-700 font-medium">Size</label>
            <select
              name="size"
              value={carData.size}
              onChange={handleChange}
              className="w-2/3 p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200"
            >
              <option value="" disabled>
                Select Size
              </option>
              {["XS", "S", "M", "L", "XL", "XXL", "XXXL"].map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>

          {/* Remaining Text Fields */}
          {[
            { label: "Description", name: "description", type: "text" },
            { label: "Price", name: "price", type: "number" },
            { label: "Category", name: "category", type: "text" },
            { label: "Quantity", name: "quantity", type: "number" },
            { label: "Header", name: "cloth_heading", type: "text" },
          ].map(({ label, name, type }) => (
            <div key={name} className="flex items-center">
              <label className="w-1/3 text-gray-700 font-medium">{label}</label>
              <input
                type={type}
                name={name}
                value={carData[name]}
                onChange={handleChange}
                className="w-2/3 p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200"
              />
            </div>
          ))}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="mt-6 w-full bg-teal-500 text-white py-3 rounded-md hover:bg-teal-600"
        >
          Save
        </button>
      </form>
    </div>
  );
}

export default Addproducts;
