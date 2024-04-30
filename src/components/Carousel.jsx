import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import image from "../assets/img/image.png";

const ReactCarousel = () => {
  return (
    <div className="containerown">
      <Carousel>
        <div>
          <img src={image} className="rounded-[25px]" />
        </div>
        <div>
          <img src={image} className="rounded-[25px]" />
        </div>
        <div>
          <img src={image} className="rounded-[25px]" />
        </div>
      </Carousel>
    </div>
  );
};

export default ReactCarousel;
