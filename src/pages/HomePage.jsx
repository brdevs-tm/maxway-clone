import React, { Fragment, useEffect, useState, useRef } from "react";
import ReactCarousel from "../components/Carousel";
import ENDPOINT from "../constants/const";

const HomePage = () => {
  const [data, setData] = useState([]);
  const [uniqueTypes, setUniqueTypes] = useState([]);
  const [activeType, setActiveType] = useState(null); // State to track the currently active type
  const containerRef = useRef(null);
  const itemRefs = useRef([]);
  const typeSectionsRefs = useRef({});

  // Fetch all data
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

  // Check for overflow in the type list and apply scrolling if necessary
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

  const handleTypeClick = (type) => {
    setActiveType(type); // Set the currently active type
    const ref = typeSectionsRefs.current[type];
    if (ref) {
      ref.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

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
                className={`px-4 py-2 border border-white rounded-[10px] bg-white transition-all duration-300 ${
                  type === activeType
                    ? "bg-gray-100 border-gray-100"
                    : "hover:border-gray-100 hover:bg-gray-100"
                } cursor-pointer`}
                key={type}
                ref={(el) => (itemRefs.current[index] = el)}
                onClick={() => handleTypeClick(type)}
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
            <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 auto-cols-max">
              {data
                .filter((product) => product.type === type)
                .map((product, index) => (
                  <li
                    className="flex flex-col px-2 py-3 rounded-md border border-gray-100"
                    key={index}
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
                      <button className="py-[18px] bg-main-purple mt-5 text-white rounded-3xl font-[500] text-[14px]">
                        Qo'shish
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
