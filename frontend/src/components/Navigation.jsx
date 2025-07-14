import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
          <FontAwesomeIcon
            icon={faHome}
            style={{ fontSize: "24px", color: "#9D0759" }}
          />
        </a>
        <a
          href="https://www.facebook.com/profile.php?id=61566890440038"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon
            icon={faFacebook}
            style={{ fontSize: "24px", color: "#9D0759" }}
          />
        </a>
        <a
          href="https://www.instagram.com/r_ricura/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon
            icon={faInstagram}
            style={{ fontSize: "24px", color: "#9D0759" }}
          />
        </a>
      </div>
      <div className="location">
        <p>
          <FontAwesomeIcon icon={faLocationDot} className="icon" />
          Brookhaven & Northern Atlanta, GA
        </p>
      </div>
    </div>
  );
};

export default Navigation;
