import React from "react";
import "../../App.css";
import Footer from "../Footer";

export default function Favorites() {
  return (
    <>
      <div className="hero-container">
        <video src="/videos/video-1.mp4" autoPlay loop muted />
        <h1>Favorites</h1>
      </div>
      <Footer />
    </>
  );
}
