import React from "react";
import "../App.css";
import { Button } from "./Button";
import "./HeroSection.css";
import { ButtonLink } from "./ButtonLink";

function HeroSection() {
  return (
    <div className="hero-container">
      <video src="/videos/video-1.mp4" autoPlay loop muted />
      <h1>ADVENTURE AWAITS</h1>
      <p>What are you waiting for?</p>
      <div className="hero-btns">
        <Button
          className="btns"
          buttonStyle="btn--outline"
          buttonSize="btn--large"
        >
          GET STARTED
        </Button>
        <ButtonLink
          className="btns"
          buttonStyle="btn--primary"
          buttonSize="btn--large"
        >
          FAVORITES <i className="fa fa-thumbs-up" />
        </ButtonLink>
      </div>
    </div>
  );
}

export default HeroSection;
