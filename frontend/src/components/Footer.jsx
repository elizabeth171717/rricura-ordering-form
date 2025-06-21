import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer>
      <p>© {currentYear} All rights reserved. Rricura Tamales & more</p>
    </footer>
  );
};

export default Footer;
