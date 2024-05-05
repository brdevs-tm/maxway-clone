import React, { useEffect, useRef } from "react";
import branches from "../constants/branches";

const YandexMap = () => {
  const mapContainerRef = useRef(null);

  useEffect(() => {
    window.ymaps.ready(() => {
      const map = new window.ymaps.Map(mapContainerRef.current, {
        center: [41.2995, 69.2401],
        zoom: 11,
      });

      branches.forEach((branch) => {
        window.ymaps.geocode(branch.fullAddress).then((result) => {
          const coords = result.geoObjects.get(0).geometry.getCoordinates();
          const placemark = new window.ymaps.Placemark(
            coords,
            {
              balloonContent: `<strong>${branch.branchAddress}</strong><br>${branch.fullAddress}`,
            },
            {
              preset: "islands#icon",
              iconColor: "#0095b6",
            }
          );
          map.geoObjects.add(placemark);
        });
      });
    });
  }, []);

  return (
    <div ref={mapContainerRef} style={{ height: "500px", width: "100%" }} />
  );
};

export default YandexMap;
