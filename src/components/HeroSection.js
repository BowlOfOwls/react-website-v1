import React from "react";
import "../App.css";
import { Button } from "./Button";
import "./HeroSection.css";
import { ButtonLink } from "./ButtonLink";

function HeroSection() {
  return (
    <div className="hero-container">
      <video src="/videos/video-3.mp4" autoPlay loop muted />
      <h1>WEATHER TRACKER</h1>
      <p>Find the weather anywhere, Anytime</p>
      <div className="hero-btns">
        <Button
          className="btns"
          buttonStyle="btn--outline"
          buttonSize="btn--large"
        >
          MY VICINITY
        </Button>
        <ButtonLink
          className="btns"
          buttonStyle="btn--primary"
          buttonSize="btn--large"
          link="/favorites"
        >
          FAVORITES <i className="fa fa-thumbs-up" />
        </ButtonLink>
      </div>
    </div>
  );
}

export default HeroSection;
