import "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import CateringMenu from "./pages/CateringMenu";
import Checkout from "./pages/Checkout";
import ThankYouPage from "./pages/ThankYouPage";
import PaymentPage from "./pages/PaymentPage";
import OnlineOrdering from "./pages/OnlineOrdering";
import DrinkSection from "./components/DrinkSection";
import AppetizerSection from "./components/AppetizerSection";
import AntojosSection from "./components/AntojosSection";
import SidesSection from "./components/SideSection";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/CateringMenu" element={<CateringMenu />} />
        <Route path="/OnlineOrdering" element={<OnlineOrdering />} />
        <Route path="/drinks" element={<DrinkSection />} />
        <Route path="/appetizers" element={<AppetizerSection />} />
        <Route path="sides" element={<SidesSection />} />
        <Route path="/antojos" element={<AntojosSection />} />
        <Route path="/Checkout" element={<Checkout />} />
        <Route path="/thank-you" element={<ThankYouPage />} />
        <Route path="/payment-page" element={<PaymentPage />} />
      </Routes>
    </Router>
  );
}

export default App;
