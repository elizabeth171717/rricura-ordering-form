import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import "./styles/layout.css";
import "./styles/variables.css";
// Pages
import HomePage from "./pages/HomePage";
import CheckoutPage from "./pages/CheckoutPage";
import ThankYouPage from "./pages/ThankYouPage";
import PaymentPage from "./pages/PaymentPage";
import OnlineOrdering from "./pages/OnlineOrdering";
import Menu from "./components/Menu/Menu";

// Sections (children)
import TamaleBuilder from "./components/TamaleBuilder";
import DrinkSection from "./components/DrinkSection";
import AntojosSection from "./components/AntojosSection";
import SidesSection from "./components/SideSection";
import SoupsSection from "./components/SoupsSection";

// Cart Context
import { CartProvider } from "./Cartcontext/CartProvider";

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/checkoutpage" element={<CheckoutPage />} />
          <Route path="/thank-you" element={<ThankYouPage />} />
          <Route path="/payment-page" element={<PaymentPage />} />

          {/* ✅ ONLINE ORDERING LAYOUT */}
          <Route path="/OnlineOrdering" element={<OnlineOrdering />}>
            {/* 👇 DEFAULT PAGE */}
            <Route index element={<TamaleBuilder />} />

            {/* 👇 NESTED SECTIONS */}
            <Route path="tamales" element={<TamaleBuilder />} />
            <Route path="drinks" element={<DrinkSection />} />
            <Route path="sides" element={<SidesSection />} />
            <Route path="antojos" element={<AntojosSection />} />
            <Route path="soups" element={<SoupsSection />} />
          </Route>

          {/* ✅ SAFETY REDIRECT */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
