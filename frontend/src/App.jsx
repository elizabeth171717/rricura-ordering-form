import "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import BulkOrderForm from "./pages/BulkOrderForm";
import StripePayment from "./components/StripePayment";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<BulkOrderForm />} />
        <Route path="/payment" element={<StripePayment />} />
      </Routes>
    </Router>
  );
}

export default App;
