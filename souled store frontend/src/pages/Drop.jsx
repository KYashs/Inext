import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Banner from "../components/Banner";
import Footer from "../components/Footer";
import { Link, useParams } from "react-router-dom";

const Drop = () => {
  const [products, setProducts] = useState([]); // All products
  const [filteredProducts, setFilteredProducts] = useState([]); // Filtered products
  const [themeSearch, setThemeSearch] = useState("");
  const [categorySearch, setCategorySearch] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [genderFilter, setGenderFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const { id } = useParams();

  const [page, setPage] = useState(1); // Current page
  const [totalPages, setTotalPages] = useState(1); // Total pages
  const [loading, setLoading] = useState(false); // Loading state

  const cache = React.useRef({}); // Cache for product data

  // Fetch paginated products
  useEffect(() => {
    const fetchProducts = async () => {
      if (cache.current[page]) {
        // Use cached data if available
        setProducts(cache.current[page].data);
        setTotalPages(cache.current[page].totalPages);
        return;
      }

      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:5000/products?page=${page}`);
        const processedData = response.data.products.map((product) => ({
          ...product,
          image: product.images[0] || "default-image-url.jpg",
        }));

        // Update state and cache
        setProducts(processedData);
        setTotalPages(response.data.totalPages);
        cache.current[page] = { data: processedData, totalPages: response.data.totalPages };
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [page]);

  // Apply filters
  useEffect(() => {
    let filtered = products;

    if (genderFilter) {
      filtered = filtered.filter(
        (product) => product.gender.toLowerCase() === genderFilter.toLowerCase()
      );
    }

    if (categoryFilter) {
      filtered = filtered.filter(
        (product) =>
          product.category.toLowerCase().includes(categoryFilter.toLowerCase())
      );
    }

    if (priceRange) {
      const [min, max] = priceRange.split("-").map(Number);
      filtered = filtered.filter(
        (product) => product.price >= min && product.price <= max
      );
    }

    if (themeSearch) {
      filtered = filtered.filter((product) =>
        product.cloth_heading.toLowerCase().includes(themeSearch.toLowerCase())
      );
    }

    setFilteredProducts(filtered);
  }, [products, themeSearch, priceRange, genderFilter, categoryFilter]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  return (
    <div>
      <Navbar />
      <Banner />

      <div className="flex flex-col md:flex-row p-4">
        <div className="hidden md:block w-1/4 p-4 border-r h-screen sticky top-0 overflow-y-auto">
          <h2 className="font-semibold text-lg mb-2">Gender</h2>
          <ul className="mb-4 space-y-2">
            {["Male", "Female", "Kids"].map((gender) => (
              <li key={gender}>
                <input
                  type="radio"
                  name="gender"
                  id={gender}
                  value={gender}
                  className="mr-2"
                  onChange={(e) => setGenderFilter(e.target.value)}
                />
                <label htmlFor={gender}>{gender}</label>
              </li>
            ))}
          </ul>

          <h2 className="font-semibold text-lg mb-2">Categories</h2>
          <input
            type="text"
            placeholder="Search for Categories"
            value={categorySearch}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="mb-4 p-2 border rounded w-full"
          />

          <h2 className="font-semibold text-lg mb-2">Prices</h2>
          <ul className="mb-4 space-y-2">
            {[
              "0-500",
              "501-1000",
              "1001-1500",
              "1501-2000",
              "2001-3000",
              "3000-5000",
            ].map((range) => (
              <li key={range}>
                <input
                  type="radio"
                  name="price"
                  id={range}
                  value={range}
                  className="mr-2"
                  onChange={(e) => setPriceRange(e.target.value)}
                />
                <label htmlFor={range}>{range}</label>
              </li>
            ))}
          </ul>

          <h2 className="font-semibold text-lg mb-2">Themes</h2>
          <input
            type="text"
            placeholder="Search for Themes"
            value={themeSearch}
            onChange={(e) => setThemeSearch(e.target.value)}
            className="mb-4 p-2 border rounded w-full"
          />
        </div>

        <div className="w-full md:w-3/4 p-4">
          {loading ? (
            <div className="text-center text-gray-500">Loading products...</div>
          ) : filteredProducts.length > 0 ? (
            <div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className="bg-white border rounded shadow-lg p-4"
                  >
                    <Link to={`/product/${product.id}`}>
                      <img
                        src={product.image}
                        alt={product.cloth_heading}
                        className="mb-2 w-full h-62 object-cover rounded"
                      />
                    </Link>
                    <div className="font-semibold text-xs">{product.cloth_heading}</div>
                    <hr className="my-2" />
                    <div className="text-sm">{product.description}</div>
                    <div className="font-bold text-lg mt-1">₹{product.price}</div>
                    <div className="text-xs text-gray-500">
                      {product.stock > 0 ? "In Stock" : "Out of Stock"}
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              <div className="flex justify-center mt-4 space-x-4">
                <button
                  className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                  disabled={page === 1}
                  onClick={() => handlePageChange(page - 1)}
                >
                  Previous
                </button>
                <span className="px-4 py-2">{`Page ${page} of ${totalPages}`}</span>
                <button
                  className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                  disabled={page === totalPages}
                  onClick={() => handlePageChange(page + 1)}
                >
                  Next
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center text-gray-500">No products match your filters.</div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Drop;
