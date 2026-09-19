
import { Helmet } from "react-helmet";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navigation from "../components/Navbar/Navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTiktok } from "@fortawesome/free-brands-svg-icons";
import { faFacebook } from "@fortawesome/free-brands-svg-icons";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import ORDERRAJAS from "../assets/ORDERRAJAS.png";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import BARBACOA3 from "../assets/barbacoa3.jpg";
import BEANSRICE from "../assets/b&r.jpg";
import MOLE from "../assets/mole.jpg";
import PORKMOLE from "../assets/porkmole.jpg";

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
import ImgGallery9 from "../assets/porkrajastamales.jpg";
import ImgGallery10 from "../assets/tamalesmasa.jpg";
import ImgGallery11 from "../assets/uncookedbarbacoa.jpg";
import ImgGallery12 from "../assets/barbacoaplate.jpg";
import ImgGallery13 from "../assets/barbacoabuffet.jpg";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import Footer from "../components/Footer/Footer";

const HomePage = () => {
const [currentIndex, setCurrentIndex] = useState(0);
const [isPaused, setIsPaused] = useState(false);

const testimonials = [
  {
    initials: "JM",
    name: "Jose M.",
   
    text: "The chicken tostadas are the bomb!!!"
  },
  {
    initials: "DR",
    name: "Daniela R.",
    text: "Rajas tamales are now my favorite tamales, 100% recommended."
  },
  {
    initials: "SC",
    name: "Susana C.",
    
    text: "Muy buenos, me recuerdan a los tamales de mi mama."
  },
  {
    initials: "MS",
    name: "Michael S.",
   
    text: "Best tamales I ever had!!"
  },
  {
    initials: "AL",
    name: "Angela L.",

    text: "I catered tamales from rricura tamales for my babyshower , they were very good!."
  },
  {
    initials: "CP",
    name: "Carlos P.",

    text: "Excellent choice, we ordered the pork pozole it was delicious!."
  },
  {
    initials: "KN",
    name: "Kevin N.",

    text: "My kids loved the chicken empanadas!"
  },
  {
    initials: "RB",
    name: "Raquel B.",
  
    text: "Muy buenos, los recominedo."
  },
  {
    initials: "JW",
    name: "James W.",

    text: "I ordered tamales and mole for my bday it was absolutely delicious."
  },
  {
    initials: "LM",
    name: "Laura M.",
   
    text: "Food Tastes like home"
  },
  {
    initials: "AS",
    name: "Alex S.",

    text: "We had the pork tamales with green sauce, they were yummy."
  },
  {
    initials: "TG",
    name: "Tina G.",
   
    text: " I Highly recommend Rricura tamales, their mole is out of these world both chicken and pork."
  }
];

useEffect(() => {
  if (isPaused) return;

  const interval = setInterval(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex === testimonials.length - 1
        ? 0
        : prevIndex + 1
    );
  }, 5000);

  return () => clearInterval(interval);
}, [isPaused, testimonials.length]);

const nextTestimonial = () => {
  setCurrentIndex((prevIndex) =>
    prevIndex === testimonials.length - 1
      ? 0
      : prevIndex + 1
  );
};

const previousTestimonial = () => {
  setCurrentIndex((prevIndex) =>
    prevIndex === 0
      ? testimonials.length - 1
      : prevIndex - 1
  );
};

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
<a href="mailto:rricura828@gmail.com">
  <FontAwesomeIcon
    icon={faEnvelope}
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
               <img
                src={ImgGallery10}
                alt="Chicken tamales with green sauce in corn husk on the make"
              />
              <img src={ImgGallery2} alt="Banana leaf tamale" />
               <img src={BEANSRICE} alt="Banana leaf tamale" />
              <img src={ImgGallery3} alt="Black bean tamales in a plate" />
               <img
                src={ImgGallery11}
                alt="Chicken tamales with green sauce in corn husk on the make"
              />
              <img
                src={ImgGallery4}
                alt="single corn husk tamales in a plate"
              />
              <img src={PORKMOLE} alt="Banana leaf tamale" />
              <img src={ImgGallery5} alt="Single banan leaf tamale i a plate" />
              <img src={TOSTADA} alt="Banana leaf tamale" />
               <img
                src={ImgGallery12}
                alt="Chicken tamales with green sauce in corn husk on the make"
              />
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
               <img
                src={ImgGallery9}
                alt="Chicken tamales with green sauce in corn husk on the make"
              />
              <img
                src={ImgGallery13}
                alt="Chicken tamales with green sauce in corn husk on the make"
              />
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



<section className="testimonials" id="testimonials">

  <div className="testimonials-heading">

    <span className="section-eyebrow">
      REAL EXPERIENCES
    </span>

    <h2>WHAT OUR COSTUMERS SAY</h2>

    <p>
      See why poeple choose Rricura for their important Events
      
    </p>

  </div>


  <div
    className="testimonial-slider"
    onMouseEnter={() => setIsPaused(true)}
    onMouseLeave={() => setIsPaused(false)}
    onTouchStart={() => setIsPaused(true)}
    onTouchEnd={() => setIsPaused(false)}
  >

    <div
      className="testimonial-track"
      style={{
        transform: `translateX(-${currentIndex * 100}%)`
      }}
    >

      {testimonials.map((testimonial, index) => (

        <article
          className="testimonial-card"
          key={index}
        >

          <div className="testimonial-top">

            <div className="reviewer">

              <div className="reviewer-avatar">
                {testimonial.initials}
              </div>

              <div>
                <h3>{testimonial.name}</h3>
                <span>{testimonial.role}</span>
              </div>

            </div>


            <div className="google-rating">

              <span>Google</span>

              <div className="stars">
                ★★★★★
              </div>

            </div>

          </div>


          <p className="testimonial-text">
            “{testimonial.text}”
          </p>

        </article>

      ))}

    </div>


    <button
      className="testimonial-arrow testimonial-prev"
      aria-label="Previous testimonial"
      onClick={previousTestimonial}
    >
      <i className="fa-solid fa-arrow-left"></i>
    </button>


    <button
      className="testimonial-arrow testimonial-next"
      aria-label="Next testimonial"
      onClick={nextTestimonial}
    >
      <i className="fa-solid fa-arrow-right"></i>
    </button>

  </div>


  <div
    className="testimonial-dots"
    aria-label="Testimonial navigation"
  >

    {testimonials.map((_, index) => (

      <button
        key={index}
        className={`testimonial-dot ${
          index === currentIndex ? "active" : ""
        }`}
        aria-label={`Go to testimonial ${index + 1}`}
        onClick={() => setCurrentIndex(index)}
      />

    ))}

  </div>

</section>

      </div>
      <Footer />
    </div>
  );
};

export default HomePage;