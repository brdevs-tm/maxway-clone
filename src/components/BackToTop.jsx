import React, { useState, useEffect } from "react";

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Function to detect scroll position
  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Function to scroll to the top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return (
    <div className="fixed bottom-10 right-10">
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="flex items-center justify-center w-10 h-10 rounded-full bg-main-purple text-white hover:bg-white hover:text-black transition duration-300 ease-in-out focus:outline-none shadow-lg"
          aria-label="Go to top"
        >
          ↑
        </button>
      )}
    </div>
  );
};

export default BackToTop;
