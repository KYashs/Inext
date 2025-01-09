import React from "react";
import Navbar from "../components/Navbar";
import Carousel from "../components/Crausol";
import DropOfTheWeek from "../components/DropOfTheWeek";
import BestSeller from "../components/BestSeller";
import Categories from "../components/Categories";
import NewArrival from "../components/NewArrival";
import Footer from "../components/Footer";
import Banner from "../components/Banner";

const Home = () => {
  return (
    <div className="overflow-x-hidden">
      <Navbar />
      <Carousel />

      {/* Drop of the Week Section */}
      <div className="flex items-center justify-center mt-10">
        <h2 className="font-bold text-2xl sm:text-3xl lg:text-4xl whitespace-nowrap">
          DROP OF THE WEEK
        </h2>
      </div>
      <DropOfTheWeek />

      {/* Best Sellers Section */}
      <div className="flex items-center justify-center mt-10">
        <h2 className="font-bold text-2xl sm:text-3xl lg:text-4xl whitespace-nowrap">
          BEST SELLERS
        </h2>
      </div>
      <BestSeller />

      {/* Categories Section */}
      <div className="flex items-center justify-center mt-10">
        <h2 className="font-bold text-2xl sm:text-3xl lg:text-4xl whitespace-nowrap">
          CATEGORIES
        </h2>
      </div>
      <Categories />

      {/* New Arrivals Section */}
      <div className="flex items-center justify-center mt-10">
        <h2 className="font-bold text-2xl sm:text-3xl lg:text-4xl whitespace-nowrap">
          NEW ARRIVALS
        </h2>
      </div>
      <NewArrival />

    
      <Banner />

      {/* Homegrown Indian Brand Section */}
      <div className="w-full bg-red-600 mt-10 text-white text-center py-4">
        <h1 className="text-base sm:text-lg lg:text-xl font-bold">
          HOMEGROWN INDIAN BRAND
        </h1>
      </div>

      {/* Happy Customers Section */}
      <div className="w-full text-center mt-5 font-bold text-2xl sm:text-3xl lg:text-4xl mb-3">
        Over 6 Million Happy Customers
      </div>

      <Footer />
    </div>
  );
};

export default Home;
