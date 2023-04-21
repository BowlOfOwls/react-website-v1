import React, {
  createContext,
  useState,
  useEffect,
  useRef,
  useContext,
} from "react";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

// import { WEATHER_API_URL, WEATHER_API_KEY } from "./component/api/index";
import { WEATHER_API_URL, WEATHER_API_KEY } from "../components/api";

import { LocationContext } from "../context/LocationContext";

export const WeatherContext = createContext({
  coordinate: {},
  currentWeather: {},
  weatherForecast: {},
  handlerSearchInput: () => {},
  activeMarker: "",
  listOfMarkers: {},
  handlerAddMarker: () => {},
  handlerSetActiveMarker: () => {},
  handleTemperatureUnit: () => {},
  handleTemperature: () => {},
  temperatureUnit: {
    isCelsius: true,
    isFahrenheit: false,
  },
});

export function WeatherProvider({ children }) {
  const [currentWeather, setCurrentWeather] = useState(null);
  // const [fiveDaysForecast, setFiveDayForecast] = useState([]);
  const [filteredFiveDaysForecast, setFilteredFiveDayForecast] = useState([]);
  const [hourForecast, setHourForecast] = useState([]);
  // const forecastUrl = `${WEATHER_API_URL}/forecast?lat=${coordinate.lat}&lon=${coordinate.lon}&appid=${WEATHER_API_KEY}`;
  const forecastUrl = `${WEATHER_API_URL}/forecast?`;
  const [coordinate, setCoordinate] = useState({
    lat: "",
    lon: "",
  });
  const [listOfMarkers, setListOfMarkers] = useState([]);
  const [activeMarker, setActiveMarker] = useState(null);
  const [temperatureUnit, setTemperautureUnit] = useState({
    isCelsius: true,
    isFahrenheit: false,
  });
  const [markerInfo, setMarkerInfo] = useState([]);

  const locationCtx = useContext(LocationContext);

  const getWeatherForecast = async (lat, lon) => {
    try {
      const response = await axios.get(forecastUrl, {
        params: {
          lat: lat,
          lon: lon,
          appid: WEATHER_API_KEY,
          units: "metric",
        },
      });
      const currentdatetime = new Date();
      const currentTime = currentdatetime.getHours();
      const filteredFiveDaysResponses = response.data.list.filter((item) =>
        currentTime >= 0 && currentTime < 18
          ? item.dt_txt.includes("06:00:00")
          : item.dt_txt.includes("18:00:00")
      );
      const hourForecastResponse = response.data.list.filter((item) => {
        return new Date(item.dt_txt) > currentdatetime;
      });
      // const filteredFiveDaysResponses = response.data.list.filter(
      //   (item) =>
      //     item.dt_txt.includes("06:00:00")
      // );
      // setFiveDayForecast(response.data.list);

      setFilteredFiveDayForecast(filteredFiveDaysResponses);
      setHourForecast(hourForecastResponse);
    } catch (error) {
      console.log(error.message);
    }
  };

  function handlerSearchInput(searchData) {
    console.log(searchData);
    const [lat, lon] = searchData.value.split(" ");

    setCoordinate({ lat: lat, lon: lon });
    // console.log(coordinate);

    getWeatherForecast(lat, lon);

    const currentWeatherFetch = fetch(
      `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );

    Promise.all([currentWeatherFetch])
      .then(async (response) => {
        const weatherResponse = await response[0].json();

        setCurrentWeather({ city: searchData.label, ...weatherResponse });
        // Placing it in here so that it will only Show the information once weather current weather and filtered 5 days is rendered
        const cityName = searchData.label;
        setMarkerInfo([cityName, lat, lon]);
      })
      .catch((err) => console.log(err));
  }

  const previousValues = useRef({ filteredFiveDaysForecast, currentWeather });
  // Runs new marker whenever there is a change to both filtered five data forecast and curent weather
  useEffect(() => {
    if (
      previousValues.current.filteredFiveDaysForecast !==
        filteredFiveDaysForecast &&
      previousValues.current.currentWeather !== currentWeather
    ) {
      //your logic here
      dynamicNewMarker(
        markerInfo[0],
        markerInfo[1],
        markerInfo[2],
        currentWeather,
        filteredFiveDaysForecast
      );
      previousValues.current = { filteredFiveDaysForecast, currentWeather };
    }
  });

  function updateContentBasedOnActiveMarker(id) {
    if (listOfMarkers.length === 0) {
      console.log("list of markers is empty");
    } else {
      let item = listOfMarkers.filter((obj) => obj.id === id);
      item = item[0];
      // handlerSearchInput(item.lat, item.lng)
      const newContent = {
        value: item.position.lat + " " + item.position.lng,
        label: item.name,
      };
      console.log(newContent);
      handlerSearchInput(newContent);
      // getWeatherForecast(item.position.lat, item.position.lng)
    }
  }

  function dynamicNewMarker(newName, lat, lon, weather, information) {
    const newID = uuidv4();
    const new_Marker = {
      id: newID,
      name: newName,
      position: { lat: parseFloat(lat), lng: parseFloat(lon) },
      information: information,
      weather: weather,
    };
    locationCtx.setLocationCoords({
      lat: parseFloat(lat),
      lon: parseFloat(lon),
    });
    const newListOfMarkers = JSON.parse(JSON.stringify(listOfMarkers));
    newListOfMarkers.push(new_Marker);
    setActiveMarker(newID);
    setListOfMarkers(newListOfMarkers);
  }

  function handlerAddMarker() {
    const placeholderLong = Math.floor(Math.random() * 140) - 70;
    const placeholderLat = Math.floor(Math.random() * 201) - 100;
    const newID = uuidv4();
    const new_Marker = {
      id: newID,
      name: "PlaceHolder",
      position: { lat: placeholderLong, lng: placeholderLat },
      information: "Temperature, Wind Conditions, All that",
    };
    const newListOfMarkers = JSON.parse(JSON.stringify(listOfMarkers));
    newListOfMarkers.push(new_Marker);
    setActiveMarker(newID);
    setListOfMarkers(newListOfMarkers);
  }

  function handlerSetActiveMarker(chosenID) {
    if (chosenID === activeMarker) {
      return;
    }
    setActiveMarker(chosenID);
  }

  function handleTemperatureUnit(unit) {
    if (unit === "CELSIUS") {
      setTemperautureUnit({
        ...temperatureUnit,
        isCelsius: true,
        isFahrenheit: false,
      });
    } else {
      setTemperautureUnit({
        ...temperatureUnit,
        isCelsius: false,
        isFahrenheit: true,
      });
    }
  }

  function handleTemperature(temperature) {
    if (temperatureUnit.isCelsius) return Math.floor(temperature);

    return Math.floor(temperature * 1.8 + 32);
  }

  const context = {
    coordinate: coordinate,
    currentWeather: currentWeather,
    weatherForecast: { filteredFiveDaysForecast, hourForecast },
    handlerSearchInput: handlerSearchInput,
    activeMarker: activeMarker,
    listOfMarkers: listOfMarkers,
    handlerAddMarker: handlerAddMarker,
    handlerSetActiveMarker: handlerSetActiveMarker,
    handleTemperatureUnit: handleTemperatureUnit,
    handleTemperature: handleTemperature,
    temperatureUnit: temperatureUnit,
    updateContentBasedOnActiveMarker: updateContentBasedOnActiveMarker,
  };

  return (
    <WeatherContext.Provider value={context}>
      {children}
    </WeatherContext.Provider>
  );
}
