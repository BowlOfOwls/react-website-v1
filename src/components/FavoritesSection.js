import React from "react";
import "../App.css";
import "./HeroSection.css";
import { ButtonLink } from "./ButtonLink";

function FavoritesSection() {
  return (
    <div
      className="hero-container"
      style={{
        height: "100vh",
        flex: "1",
      }}
    >
      <video src="/videos/video-1.mp4" autoPlay loop muted />
      <h1>WEATHER TRACKER</h1>
      <p>Revisit Your Favorites</p>
      <div className="hero-btns">
        <ButtonLink
          className="btns"
          buttonStyle="btn--primary"
          buttonSize="btn--large"
          link="/"
        >
          Country
        </ButtonLink>
      </div>
    </div>
  );
}

export default FavoritesSection;
