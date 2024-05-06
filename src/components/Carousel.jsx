import React, { useState } from "react";

const ReactCarousel = () => {
  const images = [
    "https://maxway.uz/_next/image?url=https%3A%2F%2Fcdn.delever.uz%2Fdelever%2Feedc6ad0-1c3c-40fb-a3f2-15b807b7ed30&w=1200&q=75",
    "https://maxway.uz/_next/image?url=https%3A%2F%2Fcdn.delever.uz%2Fdelever%2Fceefc9aa-89e1-4464-9415-7cabc48a65d1&w=1200&q=75",
  ];
  const [activeIndex, setActiveIndex] = useState(0);

  const goToSlide = (index) => {
    setActiveIndex(index);
  };

  const goToPrevSlide = () => {
    let index = activeIndex;
    const length = images.length;
    if (index < 1) {
      index = length - 1;
    } else {
      index--;
    }
    setActiveIndex(index);
  };

  const goToNextSlide = () => {
    let index = activeIndex;
    const length = images.length;
    if (index === length - 1) {
      index = 0;
    } else {
      index++;
    }
    setActiveIndex(index);
  };

  return (
    <div className="containerown">
      <div className="relative w-full overflow-hidden">
        <div
          className="flex transition-transform ease-linear duration-500"
          style={{
            width: `${images.length * 100}%`,
            transform: `translateX(-${(activeIndex * 100) / images.length}%)`,
          }}
        >
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Slide ${index}`}
              className="block w-full object-cover"
              style={{ width: "100%", height: "500px" }}
            />
          ))}
        </div>
        <div className="absolute z-30 flex space-x-2 justify-center w-full bottom-5">
          {images.map((_, index) => (
            <button
              key={index}
              className={`h-3 w-3 rounded-full ${
                index === activeIndex ? "bg-blue-500" : "bg-white"
              }`}
              onClick={() => goToSlide(index)}
              aria-label={`Slide ${index + 1}`}
            />
          ))}
        </div>
        <button
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-black bg-opacity-50 text-white cursor-pointer"
          onClick={goToPrevSlide}
          aria-label="Previous slide"
        >
          ❮
        </button>
        <button
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-black bg-opacity-50 text-white cursor-pointer"
          onClick={goToNextSlide}
          aria-label="Next slide"
        >
          ❯
        </button>
      </div>
    </div>
  );
};

export default ReactCarousel;
