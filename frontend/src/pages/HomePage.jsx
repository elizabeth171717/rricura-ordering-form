import React from "react";
import { Link } from "react-router-dom";
import Navigation from "../components/Navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTruck } from "@fortawesome/free-solid-svg-icons";
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import { faBan } from "@fortawesome/free-solid-svg-icons";
import FlipCard from "../components/FlipCard";
import holidayPic from "../assets/holiday.jpg";
import corporatePic from "../assets/watermelon.jpg";
import FamilyPic from "../assets/esquite.jpg";
import weddingPic from "../assets/mix.jpg";

import Footer from "../components/Footer";

const HomePage = () => {
  return (
    <div className="homepage">
      <Navigation />
      <div className="hero-section">
        <div className="hero-intro">
          <div className="hero-title">
            <h2>
              Order authentic MEXICAN TAMALES 🫔 for your next event 🎉— from
              intimate gatherings of 12 to large parties of 1000 or more !!!
            </h2>
          </div>
          <div className="hero-CTA">
            <Link to="/CateringMenu" className="home-btn">
              ORDER NOW
            </Link>
          </div>
        </div>
      </div>
      <div className="hero-boxes">
        <div className="h-box">
          <span>
            <FontAwesomeIcon icon={faTruck} />
          </span>
          <p>Delivery only</p>
        </div>
        <div className="h-box">
          <FontAwesomeIcon icon={faCalendarDays} />
          <p>2 days advanced notice</p>
        </div>
        <div className="h-box">
          <FontAwesomeIcon icon={faBan} />
          <p>Closed Sundays</p>
        </div>
      </div>

      <div className="info-section">
        <div className="cards">
          <FlipCard
            title="TAMALES"
            description="Handcrafted using family recipes. No shortcuts — just flavor. Sold  by Dozen(12 tamales).
          We offer chicken, pork, rajas, sweet, veggie and even vegan tamales."
            image={holidayPic}
            direction="left"
          />
          <FlipCard
            title="MIX & MATCH"
            description="Craving more than just one flavor? Mix & match tamales your way — and level it up with fresh salsa verde and sour cream on the side."
            image={weddingPic}
            direction="right"
          />

          <FlipCard
            title="DRINKS"
            description="Make it a full meal — pair your tamales with our refreshing aguas frescas made from real fruit: Watermelon, Jamaica, Pineapple, Cantaloupe, and Horchata.
Warm up with our traditional Atole: Champurrado or Atole de Arroz.

"
            image={corporatePic}
            direction="left"
          />
          <FlipCard
            title="MORE"
            description="Try our delicios  Esquites, elotes and Soups: chicken, black bean and fideo."
            image={FamilyPic}
            direction="right"
          />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
