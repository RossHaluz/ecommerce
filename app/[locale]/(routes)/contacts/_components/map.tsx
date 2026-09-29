"use client";
import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

// Стилі карти (наприклад, ширина та висота)
const mapContainerStyle = {
  width: "100%",
  height: "100%",
};

// Центр карти
const center = {
  lat: 49.409472, //Широта
  lng: 26.951876, // Довгота
};

const Map = () => {
  return (
    <LoadScript googleMapsApiKey={process.env.GOOGLE_MAPS_API_KEY || ""}>
      <div className="w-full h-[254px] md:h-[450px] rounded-[5px] overflow-hidden shadow-lg">
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={center}
          zoom={10} // Рівень збільшення
        >
          {/* Додайте маркер */}
          <Marker position={center} />
        </GoogleMap>
      </div>
    </LoadScript>
  );
};

export default Map;
