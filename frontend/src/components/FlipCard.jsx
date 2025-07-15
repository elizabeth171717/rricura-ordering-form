import React from "react";
import { motion } from "framer-motion"; // ✅ Needed for animation

const FlipCard = ({ title, description, image, direction = "left" }) => {
  const variants = {
    hidden: {
      opacity: 0,
      x: direction === "left" ? -100 : 100,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <motion.div
      className="flip-card"
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="flip-card-inner">
        <div
          className="flip-card-front"
          style={{ backgroundImage: `url(${image})` }}
        >
          <h1>{title}</h1>
        </div>
        <div className="flip-card-back">
          <h2>{description}</h2>
        </div>
      </div>
    </motion.div>
  );
};

export default FlipCard;
