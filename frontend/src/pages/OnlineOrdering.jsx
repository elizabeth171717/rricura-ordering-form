import { NavLink, Outlet } from "react-router-dom";
import Navigation from "../components/Navbar/Navigation";

import Footer from "../components/Footer/Footer";

const OnlineOrdering = () => {
  return (
    <>
      <Navigation />
      <div className="title-container">
<h3>DROP-OFF CATERING AVIALABLE 6 DAYS A WEEK "MONDAY- SATURDAY"  FROM 8:00AM  TO 9:00PM .
             </h3>
</div>
      {/* 🔁 CATEGORY TOGGLE — ALWAYS VISIBLE */}
      <div className="category-toggle">
        <NavLink
          to="."
          end
          className={({ isActive }) =>
            isActive ? "category-link active" : "category-link"
          }
        >
          Tamales
        </NavLink>

<NavLink
          to="guisados"
          className={({ isActive }) =>
            isActive ? "category-link active" : "category-link"
          }
        >
          Guisados
        </NavLink>

        <NavLink
          to="drinks"
          className={({ isActive }) =>
            isActive ? "category-link active" : "category-link"
          }
        >
           Drinks
        </NavLink>

        <NavLink
          to="sides"
          className={({ isActive }) =>
            isActive ? "category-link active" : "category-link"
          }
        >
           Sides
        </NavLink>

        <NavLink
          to="antojos"
          className={({ isActive }) =>
            isActive ? "category-link active" : "category-link"
          }
        >
           Antojos
        </NavLink>
        <NavLink
          to="soups"
          className={({ isActive }) =>
            isActive ? "category-link active" : "category-link"
          }
        >
          🌽 Soups
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
