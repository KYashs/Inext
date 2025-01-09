import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

// Importing images directly
import slide1 from "../images/HOMPAGE.webp";
import slide2 from "../images/homepage_12.webp";
import slide3 from "../images/homepage_banner_copy_12.webp";

const Carousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isSliding, setIsSliding] = useState(true);

  const slides = [
    { src: slide1, alt: "Contact Us Image" },
    { src: slide2, alt: "Contact Us Image" },
    { src: slide3, alt: "Logo Image" },
  ];

  useEffect(() => {
    if (!isSliding) return;

    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [isSliding, slides.length]);

  const handlePrev = () => {
    setIsSliding(false);
    setCurrentSlide(
      (prevSlide) => (prevSlide - 1 + slides.length) % slides.length
    );
    setTimeout(() => setIsSliding(true), 5000); // Pause for 5 seconds
  };

  const handleNext = () => {
    setIsSliding(false);
    setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    setTimeout(() => setIsSliding(true), 5000); // Pause for 5 seconds
  };

  return (
    <div className="relative w-full h-full overflow-hidden">
      <div className="relative w-full h-64 sm:h-80 md:h-96 lg:h-screen overflow-hidden">
        <div className="relative w-full h-full">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`absolute w-full h-full transition-opacity ${
                index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
              }`}
              style={{ transition: "opacity 0.5s ease-in-out" }}
            >
              <img
                className="w-full h-full object-cover rounded-md"
                loading="lazy"
                alt={slide.alt}
                src={slide.src}
              />
            </div>
          ))}

          {/* Navigation Buttons */}
          <button
            className="absolute top-1/2 left-4 sm:left-8 transform -translate-y-1/2 text-white p-2 sm:p-3 rounded-full z-20 bg-gray-800/60 hover:bg-gray-800/80"
            onClick={handlePrev}
            aria-label="Previous slide"
          >
            <FontAwesomeIcon size="lg" icon={faChevronLeft} />
          </button>
          <button
            className="absolute top-1/2 right-4 sm:right-8 transform -translate-y-1/2 text-white p-2 sm:p-3 rounded-full z-20 bg-gray-800/60 hover:bg-gray-800/80"
            onClick={handleNext}
            aria-label="Next slide"
          >
            <FontAwesomeIcon size="lg" icon={faChevronRight} />
          </button>
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex justify-center space-x-2 z-40">
          {slides.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full ${
                index === currentSlide ? "bg-gray-400" : "bg-white"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Carousel;
