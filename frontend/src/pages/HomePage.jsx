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
        <title>
          Mexican Tamale Catering in Brookhaven & Atlanta | Rricura Tamales
        </title>
        <meta
          name="description"
          content="Rricura Tamales offers authentic Mexican tamale catering in Brookhaven & Atlanta. Perfect for weddings, parties, and corporate events. Fresh tamales delivered hot!"
        />
      </Helmet>
      <Navigation />
      <div className="sections-container">
        <section className="contaniner hero-section">
          <div className="text-container">
            <div className="icons-container">
              <a
                href="https://www.facebook.com/profile.php?id=61566890440038"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon
                  icon={faFacebook}
                  style={{ fontSize: "1.75rem", color: "white" }}
                />
              </a>
              <a
                href="https://www.instagram.com/r_ricura/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon
                  icon={faInstagram}
                  style={{ fontSize: "1.75rem", color: "white" }}
                />
              </a>
              <a
                href="https://x.com/Rricuratamales"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon
                  icon={faTwitter}
                  style={{ fontSize: "1.75rem", color: "white" }}
                />
              </a>
              <a
                href="https://www.tiktok.com/@rricuratamales?_t=ZP-8y5G5NDSIQw&_r=1"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon
                  icon={faTiktok}
                  style={{ fontSize: "1.75rem", color: "white" }}
                />
              </a>
            </div>
            <div className="hero-title">
              <h2>Mexican Tamale Catering in Brookhaven & Atlanta</h2>
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
          <div className="graphic-container">
            {" "}
            <div className="hero-img">
              <img src={TamalesTray} />
            </div>
          </div>
        </section>
        <section className="contaniner about-section">
          <div className="text-container">
            <h2>Authentic Mexican Catering for Every Occasion</h2>
            <p>
              At Rricura Tamales, we specialize in catering authentic Mexican
              tamales 🫔for events of all sizes — from intimate family
              gatherings of 12 to large celebrations with 1000+ guests. Whether
              it’s a wedding, quinceañera, corporate lunch, or birthday party,
              we’ll make your event unforgettable.
            </p>
          </div>
          <div className="graphic-container">
            <Link to="/OnlineOrdering">
              <img src={ORDERCHICKEN} />
            </Link>
          </div>
        </section>
        <section className="contaniner video-section">
          <div className="text-container">
            <h2>HOW TO ORDER CATERING</h2>

            <div className="list">
              <p>✅ Choose your tamale flavors & quantity..</p>
              <p>✅ Select your delivery date and time.</p>
              <p>✅ We prepare your order fresh and deliver it hot & ready.</p>
            </div>
          </div>
          <div className="graphic-container">
            <video width="100%" height="auto" controls>
              <source src={myVideo} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </section>
        <section className="container">
          <div className="text-container">
            <h2>Our Catering Menu</h2>
            <p>
              We offer traditional tamales: Chicken, Pork, Rajas, Black Beans,
              Chipillin, Sweet and Fruits. As well as specialty Tamales: Vegan .
              Make it a combo, add salsa verde and aguas frescas for the full
              expirience.
            </p>
          </div>
          <div className="graphic-container">
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
          </div>
        </section>
        <section className="container">
          <h1 className="full-text">
            Enjoy our delicious Tamales with{" "}
            <span className="highlight">Family</span> ,{" "}
            <span className="highlight">Coworkers</span> and{" "}
            <span className="highlight">Friends</span>.
          </h1>
        </section>

        <section className="container chooseUs-container">
          <div className="text-container">
            {" "}
            <h2>Why Choose Rricura Tamales for Your Catering?</h2>
            <div className="list">
              <p>✅ Authentic homemade Mexican recipes</p>
              <p>✅ Perfect for groups of 12 to 1000+</p>
              <p>✅ Fresh, hot, and delivered on time</p>
            </div>
          </div>
          <div className="graphic-container">
            <Link to="/OnlineOrdering">
              <img src={ORDERRAJAS} />
            </Link>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
