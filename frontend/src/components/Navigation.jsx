import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook } from "@fortawesome/free-brands-svg-icons";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";

const Navigation = () => {
  return (
    <div className="navigation">
      <img className="logo" src="/logo.png" alt="Logo" />
      <div className="icons-container">
        <FontAwesomeIcon icon={faFacebook} style={{ fontSize: "24px" }} />
        <FontAwesomeIcon icon={faInstagram} style={{ fontSize: "24px" }} />
      </div>
    </div>
  );
};

export default Navigation;
