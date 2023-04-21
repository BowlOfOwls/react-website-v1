import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="footer-container">
      <div class="footer-links">
        <div className="footer-link-wrapper">
          <div class="footer-link-items">
            <h2>Contact Us</h2>
            <Link to="/">Contact</Link>
            <Link to="/">Support</Link>
            <Link to="/">Destinations</Link>
            <Link to="/">Sponsorships</Link>
          </div>
        </div>
      </div>
      <section class="social-media">
        <div class="social-media-wrap">
          <div class="footer-logo">
            <Link to="/" className="social-logo">
              WEATHR
              <i class="fab fa-pied-piper-square"></i>
            </Link>
          </div>
          <small class="website-rights">WEATHR © 2023</small>
          <div class="social-icons">
            <a
              href="https://www.facebook.com"
              class="social-icon-link facebook"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i class="fab fa-facebook-f" />
            </a>
            <a
              href="https://www.instagram.com"
              class="social-icon-link instagram"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i class="fab fa-instagram" />
            </a>
            <a
              href="https://www.youtube.com"
              class="social-icon-link youtube"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i class="fab fa-youtube" />
            </a>
            <a
              href="https://www.twitter.com"
              class="social-icon-link twitter"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i class="fab fa-twitter" />
            </a>
            <a
              href="https://www.linkedin.com"
              class="social-icon-link linkedin"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i class="fab fa-linkedin" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Footer;
