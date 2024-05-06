import React, { Fragment, useEffect, useState, useRef } from "react";
import ReactCarousel from "../components/Carousel";
import BackToTop from "../components/BackToTop";
import ENDPOINT from "../constants/const";

const HomePage = ({ toggleItemInCart, cartItems }) => {
  document.title = "Home Page";
  const [data, setData] = useState([]);
  const [uniqueTypes, setUniqueTypes] = useState([]);
  const [activeType, setActiveType] = useState(null);
  const sectionRefs = useRef({});

  useEffect(() => {
    fetch(ENDPOINT)
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        const types = Array.from(new Set(data.map((product) => product.type)));
        setUniqueTypes(types);
        types.forEach((type) => {
          sectionRefs.current[type] = React.createRef();
        });
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentPosition = window.scrollY + window.innerHeight / 2;
      let foundActiveType = null;
      uniqueTypes.forEach((type) => {
        const section = sectionRefs.current[type].current;
        if (section) {
          const offsetTop = section.offsetTop;
          const offsetBottom = offsetTop + section.offsetHeight;
          if (currentPosition >= offsetTop && currentPosition < offsetBottom) {
            foundActiveType = type;
          }
        }
      });
      if (foundActiveType && foundActiveType !== activeType) {
        setActiveType(foundActiveType);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeType, uniqueTypes]);

  const handleTypeClick = (type) => {
    setActiveType(type);
    const section = sectionRefs.current[type].current;
    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <Fragment>
      <div className="mt-28">
        <div className="flex mb-5">
          <ReactCarousel />
        </div>
        <div className="containerown sticky top-[96px] bg-white">
          <ul className="flex overflow-x-hidden flex-nowrap justify-between border text border-main-purple border-r-0 border-l-0">
            {uniqueTypes.map((type) => (
              <li
                key={type}
                onClick={() => handleTypeClick(type)}
                className={`px-4 py-2 cursor-pointer ${
                  activeType === type
                    ? "border border-main-purple border-b-0 border-t-0"
                    : "bg-white"
                }`}
              >
                {type}
              </li>
            ))}
          </ul>
        </div>
        {uniqueTypes.map((type) => (
          <div
            ref={sectionRefs.current[type]}
            key={type}
            className="containerown mt-4"
          >
            <h2 className="text-[24px] font-[700] my-5">{type}</h2>
            <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
              {data
                .filter((product) => product.type === type)
                .map((product, index) => (
                  <li
                    key={index}
                    className="flex flex-col px-2 py-3 rounded-md border border-gray-100"
                  >
                    <div className="product-body">
                      <img
                        src={product.image}
                        className="rounded-md"
                        alt={product.name}
                      />
                    </div>
                    <div className="product-footer flex flex-col">
                      <h1 className="text-[16px] font-[500] mb-2">
                        {product.name}
                      </h1>
                      <span className="line-clamp-2 max-w-[162px] mb-3 text-[12px] font-[400]">
                        {product.description}
                      </span>
                      <p>{product.price}$</p>
                      <button
                        onClick={() => toggleItemInCart(product.id)}
                        className={`py-[18px] mt-5 text-lg rounded-3xl font-medium px-4 transition-all duration-300 ${
                          cartItems[product.id]
                            ? "bg-white text-main-purple border border-main-purple"
                            : "bg-main-purple text-white"
                        }`}
                      >
                        {cartItems[product.id]
                          ? "Remove from Cart"
                          : "Add to Cart"}
                      </button>
                    </div>
                  </li>
                ))}
            </ul>
          </div>
        ))}
      </div>
      <BackToTop />
    </Fragment>
  );
};

export default HomePage;
