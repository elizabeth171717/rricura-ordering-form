import React from "react";
import { Helmet } from "react-helmet";

import { Link } from "react-router-dom";
import Navigation from "../components/Navbar/Navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTiktok } from "@fortawesome/free-brands-svg-icons";
import { faFacebook } from "@fortawesome/free-brands-svg-icons";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import ORDERRAJAS from "../assets/ORDERRAJAS.png";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import BARBACOA3 from "../assets/barbacoa3.jpg";
import BEANSRICE from "../assets/b&r.jpg";
import MOLE from "../assets/mole.jpg";
import PORKMOLE from "../assets/porkmole.jpg";
import BUFFET from "../assets/buffet.jpg";
import TOSTADA from "../assets/tostada.jpg";
import AGUAS from "../assets/aguas.jpg";
import ImgGallery1 from "../assets/chickengreencorn.jpg";
import ImgGallery2 from "../assets/bananaleafchicken.jpg";
import ImgGallery3 from "../assets/pintotamale.jpg";
import ImgGallery4 from "../assets/holiday.jpg";
import ImgGallery5 from "../assets/family.jpg";
import ImgGallery6 from "../assets/sweettamale.png";

import ImgGallery7 from "../assets/rajas.jpg";
import ImgGallery8 from "../assets/chickentamale.jpg";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import Footer from "../components/Footer/Footer";

const HomePage = () => {
  return (
    <div className="homepage">
      <Helmet>
        <title>The Best Tamales in Atlanta & Brookhaven</title>
        <meta
          name="description"
          content="World cup Tamales catering in Atlanta, We cater Authentic Mexican Tamales in Brookhaven, GA and nearby areas. Perfect for events of all sizes."
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
              <a
  href="https://share.google/ihhOJFwNaIQ39VLgf"
  target="_blank"
  rel="noopener noreferrer"
>
  <FontAwesomeIcon
    icon={faGoogle}
    style={{ fontSize: "1.75rem", color: "white" }}
  />
</a>
            </div>
            <div className="hero-title">
              <h1>Mexican Food Catering in Brookhaven & Atlanta, GA</h1>
            </div>
  <div className="hero-btn">
              
              <Link to="/menu" className="home-btn">
                MENU
              </Link>
              <Link to="/OnlineOrdering" className="home-btn">
                ORDER NOW
              </Link>
             
            </div>
            
            <div className="hero-descrition">
  <p className="desciption-title" >Perfect for</p>

  <div className="slide-container">
    {[
      "Fundraisers",
      "Birthdays",
      "Anniversaries",
      "Graduations",
      "Holidays",
      "Weddings",
      "Baby Showers",
      "Corporate meetings",
      "Picnics",
      "Office lunches",
      "Retirement parties",
      "Bridal showers",
      "Game-day",
      "Memorial services",
      "Family reunions",
      "Baby gender reveal",
      "Rehearsals",
      "Sports tailgates",
      "Charity galas",
      "Product launches"
    ].map((text, i) => (
      <p
        className="slide"
        style={{ "--i": i }}
        key={text}
      >
        {text}
      </p>
    ))}
  </div>
</div>
           </div>
        </section>{" "}

  
 

     

        <section className="container">
          <div className="text-container">
            
             <h2>Hosting an event soon? Don't settle for boring party platters.
             Let’s be honest—Mexican food is what your guests actually want!</h2>
          </div>
          <div className="graphic-container">
            <div className="gallery">
              <img
                src={ImgGallery1}
                alt="Chicken tamales with green sauce in corn husk on the make"
              />
              <img
                src={MOLE}
                alt="Rajas tamales , cheese and pepper in corn husk"
              />
              <img
                src={AGUAS}
                alt="Chicken tamales with red sauce in corn husk on the make"
              />
              <img src={ImgGallery2} alt="Banana leaf tamale" />
               <img src={BEANSRICE} alt="Banana leaf tamale" />
              <img src={ImgGallery3} alt="Black bean tamales in a plate" />
              <img
                src={ImgGallery4}
                alt="single corn husk tamales in a plate"
              />
              <img src={PORKMOLE} alt="Banana leaf tamale" />
              <img src={ImgGallery5} alt="Single banan leaf tamale i a plate" />
              <img src={TOSTADA} alt="Banana leaf tamale" />
              <img src={ImgGallery6} alt="Bulk of red sweet tamales" />
              <img
                src={ImgGallery7}
                alt="Rajas tamales , cheese and pepper in corn husk"
              />
              <img
                src={BARBACOA3}
                alt="Rajas tamales , cheese and pepper in corn husk"
              />
              <img
                src={ImgGallery8}
                alt="Chicken tamales with red sauce in corn husk on the make"
              />
               <img src={BUFFET} alt="Banana leaf tamale" />
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
            <p className="paragraph-text">
              Every order is prepared with care using traditional recipes and
              quality ingredients. Rricura Tamales is a local, family-run
              business dedicated to bringing authentic Mexican flavors to the
              Brookhaven and Atlanta community.
            </p>
            <div className="list">
              <p className="paragraph-text">
                ✅ Authentic homemade Mexican recipes
              </p>
              <p className="paragraph-text">
                ✅ Perfect for groups of 12 to 1000+
              </p>
              <p className="paragraph-text">
                ✅ Fresh, hot, and delivered on time
              </p>
            </div>
          </div>
          <div className="graphic-container">
            <Link to="/OnlineOrdering">
              <img
                src={ORDERRAJAS}
                alt="Rajas tamales , cheese and pepper in corn husk on the make"
              />
            </Link>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;