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
import myVideo from "../assets/ordervideo.mp4";
import ORDERCHICKEN from "../assets/ORDERCHICKEN.png";
import TamalesTray from "../assets/tamalestray.png";
import ImgGallery1 from "../assets/chickengreencorn.jpg";
import ImgGallery2 from "../assets/bananaleafchicken.jpg";
import ImgGallery3 from "../assets/pintotamale.jpg";
import ImgGallery4 from "../assets/holiday.jpg";
import ImgGallery5 from "../assets/family.jpg";
import ImgGallery6 from "../assets/sweettamale.png";
import ImgGallery7 from "../assets/rajas.jpg";
import ImgGallery8 from "../assets/chickentamale.jpg";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
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
        <div className="hero-title">
          <h2>WE CATER</h2>
        </div>
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
            href="https://x.com/Rricuratamales"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon
              icon={faTwitter}
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
        <div className="hero-img">
          <img src={TamalesTray} />
        </div>
      </div>
      <section className="tamales-intro">
        <div className="split video">
          <div className="container text-container">
            <h1 className="big-text">HOW TO ORDER</h1>
            <div className="list">
              <p>✅Choose Tamale quantity.</p>
              <p>✅Choose Tamale filling.</p>
              <p>✅Choose Tamale Wrapper.</p>
              <p>✅Choose Tamale Sauce.</p>
              <p>✅Enter delivery details. </p>
            </div>
            <div className="home-btn">
              <Link to="/OnlineOrdering">ORDER NOW</Link>
            </div>
          </div>
          <div className="container  graphic-container">
            <video width="100%" height="auto" controls>
              <source src={myVideo} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
        <div className="gallery">
          <img src={ImgGallery1} />
          <img src={ImgGallery2} />
          <img src={ImgGallery3} />
          <img src={ImgGallery4} />
          <img src={ImgGallery5} />
          <img src={ImgGallery6} />
          <img src={ImgGallery7} />
          <img src={ImgGallery8} />
        </div>

        <div className="full">
          <h1 className="full-text">
            Enjoy our delicious Tamales with{" "}
            <span className="highlight">Family</span> ,{" "}
            <span className="highlight">Coworkers</span> and{" "}
            <span className="highlight">Friends</span>.
          </h1>
        </div>
        <div className="split">
          <div className="container  graphic-container">
            <Link to="/OnlineOrdering">
              <img src={ORDERCHICKEN} />
            </Link>
          </div>
          <div className="container  graphic-container">
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
