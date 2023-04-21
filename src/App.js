import React from "react";
import Navbar from "./components/Navbar";
import "./App.css";
import Home from "./components/pages/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Favorites from "./components/pages/Favorites";
import { LocationProvider } from "./context/LocationContext";

function App() {
  return (
    <>
      {/* <WeatherProvider> */}
      <LocationProvider>
        <Router>
          <Navbar />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/favorites" component={Favorites} />
          </Switch>
        </Router>
      </LocationProvider>
      {/* </WeatherProvider> */}
    </>
  );
}

export default App;
