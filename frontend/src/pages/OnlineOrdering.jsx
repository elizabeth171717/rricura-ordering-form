import { NavLink, Outlet } from "react-router-dom";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";

const OnlineOrdering = () => {
  return (
    <>
      <Navigation />

      {/* 🔁 CATEGORY TOGGLE — ALWAYS VISIBLE */}
      <div className="category-toggle">
        <NavLink
          to="."
          end
          className={({ isActive }) =>
            isActive ? "category-link active" : "category-link"
          }
        >
          🫔 Tamales
        </NavLink>

        <NavLink
          to="drinks"
          className={({ isActive }) =>
            isActive ? "category-link active" : "category-link"
          }
        >
          🥤 Drinks
        </NavLink>

        <NavLink
          to="sides"
          className={({ isActive }) =>
            isActive ? "category-link active" : "category-link"
          }
        >
          🥣 Sides
        </NavLink>

        <NavLink
          to="antojos"
          className={({ isActive }) =>
            isActive ? "category-link active" : "category-link"
          }
        >
          🌽 Antojos
        </NavLink>
      </div>

      {/* 🔄 CHILD CONTENT */}
      <div className="step-container">
        <Outlet />
      </div>

      <Footer />
    </>
  );
};

export default OnlineOrdering;
