import React, { createContext, useState } from "react";

export const LocationContext = createContext({
  currentLocation: "",
  search: {},
  currentCoords: {},
  setLocation: () => {},
  setLocationCoords: () => {},
  setLocationSearch: () => {},
});

export function LocationProvider({ children }) {
  const [currentLocation, setCurrentLocation] = useState("");
  const [currentCoords, setCurrentCoords] = useState({ lat: 0, lon: 0 });
  const [search, setSearch] = useState(null);

  const setLocation = (location) => {
    setCurrentLocation(location);
  };

  const setLocationCoords = (coords) => {
    // console.log("set coordinates:", coords);
    setCurrentCoords(coords);
  };

  const setLocationSearch = (location) => {
    setSearch(location);
    const location_String = location?.label;
    const [city] =
      location_String === undefined ? ["", ""] : location_String.split(", ");
    setCurrentLocation(city);
  };

  const context = {
    currentLocation: currentLocation,
    search: search,
    currentCoords: currentCoords,
    setLocation: setLocation,
    setLocationCoords: setLocationCoords,
    setLocationSearch: setLocationSearch,
  };

  return (
    <LocationContext.Provider value={context}>
      {children}
    </LocationContext.Provider>
  );
}
