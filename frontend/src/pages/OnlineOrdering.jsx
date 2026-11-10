import { NavLink, Outlet, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet";
import Navigation from "../components/Navbar/Navigation";

import Footer from "../components/Footer/Footer";

const OnlineOrdering = () => {
  const location = useLocation();
 const currentPath = location.pathname.replace(/\/+$/, "");

 const seoPages = {
    "/OnlineOrdering": {
      title: "Authentic Mexican Tamales for Catering | Rricura",
      description:
        "Order authentic homemade Mexican tamales from Rricura in Brookhaven and Atlanta, GA."
    },

    "/OnlineOrdering/drinks": {
      title: "Mexican Drinks for Catering | Rricura",
      description:
        "Add refreshing Mexican drinks to your catering order from Rricura in Brookhaven and Atlanta."
    },

    "/OnlineOrdering/guisados": {
      title: "Authentic Mexican Guisados | Rricura",
      description:
        "Order authentic Mexican guisados for your next gathering or event in Atlanta and Brookhaven."
    },

    "/OnlineOrdering/sides": {
      title: "Mexican Catering Sides | Rricura",
      description:
        "Complete your Mexican catering order with delicious sides from Rricura in Atlanta."
    },

    "/OnlineOrdering/antojos": {
      title: "Authentic Mexican Antojitos | Rricura",
      description:
        "Explore authentic Mexican antojitos from Rricura for your next gathering or celebration."
    },

    "/OnlineOrdering/soups": {
      title: "Authentic Mexican Soups | Rricura",
      description:
        "Order traditional Mexican soups from Rricura in Brookhaven and Atlanta, GA."
    }
  };

  const seo = seoPages[currentPath] || seoPages["/OnlineOrdering"];

  const canonicalUrl = `https://www.rricuratamales.com${currentPath}`;
  return (
    <>
        <Helmet>
    <title>{seo.title}</title>

    <meta
      name="description"
      content={seo.description}
    />

    <link
      rel="canonical"
      href={canonicalUrl}
    />
  </Helmet>
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
