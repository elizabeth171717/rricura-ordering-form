import "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import CateringMenu from "./pages/CateringMenu";
import Checkout from "./pages/Checkout";
import ThankYouPage from "./pages/ThankYouPage";
import PaymentPage from "./pages/PaymentPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CateringMenu />} />
        <Route path="/Checkout" element={<Checkout />} />
        <Route path="/thank-you" element={<ThankYouPage />} />
        <Route path="/payment-page" element={<PaymentPage />} />
      </Routes>
    </Router>
  );
}

export default App;
