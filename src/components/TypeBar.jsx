import React, { Fragment, useEffect, useState, useRef } from "react";
import ENDPOINT from "../constants/const";

const TypeBar = () => {
  const [data, setData] = useState([]);
  const containerRef = useRef(null);
  const itemRefs = useRef([]);

  useEffect(() => {
    const fetchData = () => {
      fetch(ENDPOINT)
        .then((response) => response.json())
        .then((data) => {
          const typeSet = new Set();
          const uniqueData = data.filter((product) => {
            if (!typeSet.has(product.type)) {
              typeSet.add(product.type);
              return true;
            }
            return false;
          });
          setData(uniqueData);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    };

    fetchData();
  }, []);

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
    window.addEventListener("resize", checkOverflow); // Handle resizing window
    return () => window.removeEventListener("resize", checkOverflow);
  }, [data]);

  return (
    <Fragment>
      <div>
        <ul
          ref={containerRef}
          className="containerown flex overflow-x-hidden flex-nowrap justify-between"
        >
          {data.map((product, index) => (
            <li
              className="px-4 py-2 border border-white rounded-[10px] bg-white transition-all duration-300 hover:border-gray-100 hover:bg-gray-100"
              key={product.type}
              ref={(el) => (itemRefs.current[index] = el)}
            >
              {product.type}
            </li>
          ))}
        </ul>
      </div>
    </Fragment>
  );
};

export default TypeBar;
