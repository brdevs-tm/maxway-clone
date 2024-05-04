import React, { Fragment, useEffect, useState, useRef } from "react";
import ReactCarousel from "../components/Carousel";
import ENDPOINT from "../constants/const";

const HomePage = ({ toggleItemInCart, cartItems }) => {
  const [data, setData] = useState([]);
  const [uniqueTypes, setUniqueTypes] = useState([]);
  const containerRef = useRef(null); // to handle overflow checks if needed
  const itemRefs = useRef([]); // to reference each list item for interaction purposes
  const typeSectionsRefs = useRef({}); // for scrolling to sections

  useEffect(() => {
    const fetchData = () => {
      fetch(ENDPOINT)
        .then((response) => response.json())
        .then((data) => {
          setData(data);
          const types = new Set(data.map((product) => product.type));
          setUniqueTypes(Array.from(types));
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    };
    fetchData();
  }, []);

  // Check if the container needs horizontal scrolling
  useEffect(() => {
    const checkOverflow = () => {
      if (containerRef.current && itemRefs.current.length) {
        const totalWidth = itemRefs.current.reduce((total, ref) => {
          return total + (ref ? ref.offsetWidth : 0);
        }, 0);
        const containerWidth = containerRef.current.offsetWidth;
        containerRef.current.style.overflowX =
          totalWidth > containerWidth ? "scroll" : "hidden";
      }
    };
    checkOverflow();
    window.addEventListener("resize", checkOverflow);
    return () => window.removeEventListener("resize", checkOverflow);
  }, [uniqueTypes]);

  return (
    <Fragment>
      <div className="mt-28">
        <ReactCarousel />
        <div
          className="containerown sticky top-[80px] bg-white z-10"
          style={{
            borderBottom: "1px solid black",
            borderRadius: "15px",
            borderBottomColor: "rgb(81, 38, 125)",
          }}
        >
          <ul
            ref={containerRef}
            className="flex overflow-x-hidden flex-nowrap justify-between"
          >
            {uniqueTypes.map((type, index) => (
              <li
                key={type}
                ref={(el) => (itemRefs.current[index] = el)}
                className={`px-4 py-2 border border-white rounded-[10px] bg-white transition-all duration-300 cursor-pointer ${
                  cartItems[type]
                    ? "bg-purple-500 text-white"
                    : "hover:bg-gray-100"
                }`}
                onClick={() => toggleItemInCart(type)}
              >
                {type}
              </li>
            ))}
          </ul>
        </div>
        {uniqueTypes.map((type) => (
          <div
            key={type}
            className="containerown mt-4"
            ref={(el) => (typeSectionsRefs.current[type] = el)}
          >
            <h2 className="text-[24px] font-[700]">{type}</h2>
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
                        className={`py-[18px] mt-5 text-lg rounded-3xl font-medium px-4 transition-colors duration-300 ${
                          cartItems[product.id]
                            ? "bg-white text-main-purple border-2 border-main-purple"
                            : "bg-purple-500 text-white"
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
    </Fragment>
  );
};

export default HomePage;
