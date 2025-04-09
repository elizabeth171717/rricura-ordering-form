import "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import BulkOrderForm from "./pages/BulkOrderForm";
import ThankYouPage from "./pages/ThankYouPage";
import PaymentPage from "./pages/PaymentPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<BulkOrderForm />} />
        <Route path="/thank-you" element={<ThankYouPage />} />
        <Route path="/paymnet-page" element={<PaymentPage />} />
      </Routes>
    </Router>
  );
}

export default App;
