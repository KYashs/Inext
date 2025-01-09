import React, { useState, useEffect } from "react";
import axios from "axios";

function AvailableStock() {
  const [products, setProducts] = useState([]); // To store the fetched product data
  const [loading, setLoading] = useState(true); // To show loading spinner

  // Fetch product data when the component mounts
  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/products?page=1&limit=100"
      ); // Fetch with pagination

      const latestProducts = response.data.products;
      const cachedProducts = localStorage.getItem("products");

      // Compare latest data with cached data
      if (!cachedProducts || JSON.stringify(latestProducts) !== cachedProducts) {
        // If the cached data is empty or different, update the cache and state
        localStorage.setItem("products", JSON.stringify(latestProducts));
        setProducts(latestProducts); // Update state with new data
      } else {
        // Use cached data if no new content has been added
        setProducts(JSON.parse(cachedProducts));
      }

      setLoading(false); // Stop loading spinner
    } catch (error) {
      console.error("Error fetching products:", error);
      setLoading(false);
    }
  };

  // Run the function when the component mounts
  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="flex flex-col items-center mt-10">
      {loading ? (
        <div className="text-center text-xl">Loading products...</div>
      ) : (
        <div className="overflow-x-auto w-full max-w-6xl">
          {/* Table with vertical scrolling */}
          <div className="overflow-y-auto max-h-[70vh]"> {/* Set the height limit */}
            <table className="min-w-full table-auto border-collapse">
              <thead className="sticky top-0 bg-gray-100 z-10">
                <tr className="text-gray-700">
                  <th className="px-4 py-2 text-left">ID</th>
                  <th className="px-4 py-2 text-left">Gender</th>
                  <th className="px-4 py-2 text-left">Size</th>
                  <th className="px-4 py-2 text-left">Description</th>
                  <th className="px-4 py-2 text-left">Price</th>
                  <th className="px-4 py-2 text-left">Category</th>
                  <th className="px-4 py-2 text-left">Quantity</th>
                  <th className="px-4 py-2 text-left">Stock</th>
                  <th className="px-4 py-2 text-left">Cloth Heading</th>
                  <th className="px-4 py-2 text-left">Images</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id} className="border-t">
                    <td className="px-4 py-2">{product.id}</td>
                    <td className="px-4 py-2">{product.gender}</td>
                    <td className="px-4 py-2">{product.size}</td>
                    <td className="px-4 py-2">{product.description}</td>
                    <td className="px-4 py-2">{product.price}</td>
                    <td className="px-4 py-2">{product.category}</td>
                    <td className="px-4 py-2">{product.quantity}</td>
                    <td className="px-4 py-2">{product.stock === 1 ? "In Stock" : "Out of Stock"}</td>
                    <td className="px-4 py-2">{product.cloth_heading}</td>
                    <td className="px-4 py-2">
                      {product.images && product.images[0] && (
                        <img
                          src={product.images[0]}
                          alt={`Product ${product.id}`}
                          className="w-16 h-16 object-cover rounded-md"
                        />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default AvailableStock;
