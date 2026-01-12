import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTiktok } from "@fortawesome/free-brands-svg-icons";
import { faFacebook } from "@fortawesome/free-brands-svg-icons";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import "./Footer.css";
const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer>
      <p>© {currentYear} All rights reserved. Rricura Tamales & more</p>
      <div className="icons-container">
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
          href="https://x.com/Rricuratamales"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon icon={faTwitter} style={{ fontSize: "1.50rem" }} />
        </a>
        <a
          href="https://www.tiktok.com/@rricuratamales?_t=ZP-8y5G5NDSIQw&_r=1"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon icon={faTiktok} style={{ fontSize: "1.50rem" }} />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
