import React from "react";
import { Helmet } from "react-helmet";
import { faHandPointDown } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import Navigation from "../components/Navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTiktok } from "@fortawesome/free-brands-svg-icons";
import { faFacebook } from "@fortawesome/free-brands-svg-icons";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import ORDERRAJAS from "../assets/ORDERRAJAS.png";
import ORDERCHICKEN from "../assets/ORDERCHICKEN.png";
import Corporate from "../assets/corporate.jpg";

import Footer from "../components/Footer";

const HomePage = () => {
  return (
    <div className="homepage">
      <Helmet>
        <title>Rricura Tamales | Authentic Mexican Tamale Catering</title>
        <meta
          name="description"
          content="We cater authentic MEXICAN TAMALES 🫔 for all events 🪅— from intimate gatherings of 12 to large parties of 1000 or more! ORDER NOW."
        />
      </Helmet>
      <Navigation />
      <div className="hero-section">
        <div className="icons-container">
          <a
            href="https://www.facebook.com/profile.php?id=61566890440038"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon
              icon={faFacebook}
              style={{ fontSize: "1.50rem", color: "white" }}
            />
          </a>
          <a
            href="https://www.instagram.com/r_ricura/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon
              icon={faInstagram}
              style={{ fontSize: "1.50rem", color: "white" }}
            />
          </a>
          <a
            href="https://www.tiktok.com/@rricuratamales?_t=ZP-8y5G5NDSIQw&_r=1"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon
              icon={faTiktok}
              style={{ fontSize: "1.50rem", color: "white" }}
            />
          </a>
        </div>

        <div className="hero-title">
          <h2>ORDER AUTHENTIC 🫔 MEXICAN TAMALES FOR YOUR NEXT EVENT</h2>
        </div>
        <div className="hero-btn">
          <FontAwesomeIcon
            icon={faHandPointDown}
            className="bouncing-pointer"
            style={{ color: "#9D0759" }}
          />
          <Link to="/OnlineOrdering" className="home-btn">
            START YOU ORDER
          </Link>
        </div>
      </div>
      <section className="tamales-intro">
        <div className="tamales-banner">
          <div className="section-title">
            <h2>
              Enjoy our delicious Tamales with Family, Coworkers and Friends
            </h2>
          </div>
          <div className="banner-img">
            <img src={Corporate} />
          </div>
        </div>
        <div className="tamale-boxes">
          <div className="tamale-box">
            <Link to="/OnlineOrdering">
              <img src={ORDERCHICKEN} />
            </Link>
          </div>
          <div className="tamale-box">
            <Link to="/OnlineOrdering">
              <img src={ORDERRAJAS} />
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default HomePage;
