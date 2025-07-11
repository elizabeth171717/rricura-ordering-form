import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook } from "@fortawesome/free-brands-svg-icons";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";

const Navigation = () => {
  return (
    <div className="navigation">
      <img className="logo" src="/logo.png" alt="Logo" />

      <div className="icons-container">
        <a
          href="https://www.facebook.com/profile.php?id=61566890440038"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon
            icon={faFacebook}
            style={{ fontSize: "24px", marginRight: "10px" }}
          />
        </a>
        <a
          href="https://www.instagram.com/r_ricura/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon icon={faInstagram} style={{ fontSize: "24px" }} />
        </a>
      </div>
    </div>
  );
};

export default Navigation;
