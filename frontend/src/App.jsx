import "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import BulkOrderForm from "./pages/BulkOrderForm";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<BulkOrderForm />} />
      </Routes>
    </Router>
  );
}

export default App;
