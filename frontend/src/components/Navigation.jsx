import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faTiktok } from "@fortawesome/free-brands-svg-icons";

import { faLocationDot } from "@fortawesome/free-solid-svg-icons";

import { faFacebook } from "@fortawesome/free-brands-svg-icons";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";

import { faHome } from "@fortawesome/free-solid-svg-icons";

const Navigation = () => {
  return (
    <div className="navigation">
      <img className="logo" src="/logo.png" alt="Logo" />

      <div className="icons-container">
        <a href="/" className="nav-link">
          <FontAwesomeIcon icon={faHome} style={{ fontSize: "1.50rem" }} />
        </a>
        <a
          href="https://www.facebook.com/profile.php?id=61566890440038"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon icon={faFacebook} style={{ fontSize: "1.50rem" }} />
        </a>
        <a
          href="https://www.instagram.com/r_ricura/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon icon={faInstagram} style={{ fontSize: "1.50rem" }} />
        </a>
        <a
          href="https://www.tiktok.com/@rricuratamales?_t=ZP-8y5G5NDSIQw&_r=1"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon icon={faTiktok} style={{ fontSize: "1.50rem" }} />
        </a>
      </div>
      <div className="location">
        <p style={{ fontWeight: "bold" }}>
          <FontAwesomeIcon icon={faLocationDot} className="icon" />
          Brookhaven & Northern Atlanta, GA
        </p>
      </div>
    </div>
  );
};

export default Navigation;
