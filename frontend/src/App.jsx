import "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";

// Pages
import HomePage from "./pages/HomePage";

import Checkout from "./pages/Checkout";
import ThankYouPage from "./pages/ThankYouPage";
import PaymentPage from "./pages/PaymentPage";
import OnlineOrdering from "./pages/OnlineOrdering";

// Sections
import DrinkSection from "./components/DrinkSection";
import AppetizerSection from "./components/AppetizerSection";
import AntojosSection from "./components/AntojosSection";
import SidesSection from "./components/SideSection";

// Cart Context
import { CartProvider } from "./Cartcontext/CartProvider";

function App() {
  return (
    <CartProvider>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<HomePage />} />

          <Route path="/OnlineOrdering" element={<OnlineOrdering />} />
          <Route path="/drinks" element={<DrinkSection />} />
          <Route path="/appetizers" element={<AppetizerSection />} />
          <Route path="/sides" element={<SidesSection />} />
          <Route path="/antojos" element={<AntojosSection />} />
          <Route path="/Checkout" element={<Checkout />} />
          <Route path="/thank-you" element={<ThankYouPage />} />
          <Route path="/payment-page" element={<PaymentPage />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
