import "./DigitalMenu.css"
import React, { useState , useEffect} from "react";
import { BACKEND_URL } from "../../constants/constants";
const CLIENT_ID = "anahuac";
const RESTAURANT_SLUG = "rricura-tamales";



function DigitalMenu() {
 const [menu, setMenu] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🥇 Initial fetch (load once)
  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const res = await fetch(
          `${BACKEND_URL}/api/${CLIENT_ID}/public-menu/${RESTAURANT_SLUG}`,
        );
        const data = await res.json();
        setMenu(data);
      } catch (err) {
        console.error("Failed to fetch menu:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMenu();
  }, []);

  if (loading) {
    return <p style={{ textAlign: "center" }}>Loading menu...</p>;
  }

  if (!menu || !menu.sections) {
    return <p style={{ textAlign: "center" }}>No menu available</p>;
  }

const tamalesSection = menu.sections.find(
  (s) => s.section?.trim().toLowerCase() === "tamales"
);



const allTamales = tamalesSection?.groups
  ? tamalesSection.groups.reduce((acc, group) => {
      if (group.items && Array.isArray(group.items)) {
        return [...acc, ...group.items];
      }
      return acc;
    }, [])
  : [];

const getProperty = (item, keyName) => {
  return item.customProperties?.find(
    (prop) => prop.key?.toLowerCase().trim() === keyName.toLowerCase()
  )?.value || "";
};
const fillingsOrder = [
  "Chicken",
  "Pork",
  "Rajas",
  "Chipilin",
  "Black Bean",
  "Sweet",
  "Picadillo",
];



const getTamalesByFilling = (wrapper, filling) => {
  return allTamales.filter((item) =>
    getProperty(item, "Wrapper")?.toLowerCase().trim() === wrapper.toLowerCase() &&
    getProperty(item, "Filling")?.toLowerCase().trim() === filling.toLowerCase()
  );
};

// 👇 SOUP SECTION
const soupsSection = menu.sections.find(
  (section) => section.section === "Soups"
);

const antojosSection = menu.sections.find(
  (section) => section.section === "Antojos"
);

 // 2️⃣ Get Drinks section
  const drinksSection = menu.sections.find(
     (section) => section.section === "Drinks"
  );

  // 3️⃣ Flatten items from Drinks section only
  const allDrinks = [
    ...(drinksSection?.groups?.flatMap((g) => g.items) || []),
    ...(drinksSection?.items || []),
  ];

 // 🔥 Get all sides (supports both grouped + non-grouped)


const sidesSection = menu.sections.find(
  (s) => s.section?.trim().toLowerCase() === "sides"
);

// 🔥 combine both sources
const sides = [
  ...(sidesSection?.groups?.flatMap((g) => g.items) || []),
  ...(sidesSection?.items || []),
];

 
 

    return(
        <div className="digitalmenu-container">
     
        <div className="digital-menu">
            <div className="tamales-container">
                <div className="container-title"><h1>TAMALES</h1></div>
                <div className="groups-container">
                <div className="cornHusk-group">
                <div className="container-subtitle">
                  <h3>Corn Husk $4.00</h3>
                  </div>
                
              <div className="cornHusk-list" >

{fillingsOrder.map((filling) => {
  const items = getTamalesByFilling("Corn Husk", filling);

  if (items.length === 0) return null;

  return (
    <div key={filling} className="item-list">

  {/* LEFT SIDE (fixed width) */}
  <div className="filling-name">
    <h2>{filling}</h2>
  </div>

  {/* RIGHT SIDE (flex area) */}
  <div className="filling-items">
    {items
       .filter((item) => item.visible !== false)
    .map((item) => {
      const sauce = getProperty(item, "Sauce");

      return (
        <div key={item.id} className="item-box">
<div className="item-image">
    {/* 🔥 ONE label only */}
  {(item.remaining !== null && item.remaining !== undefined) && (
    <div className="status-label">
      {item.remaining === 0
        ? "Sold Out"
        : `Only ${item.remaining} left`}
    </div>
  )}


    {/* 🔥 OVERLAY */}
    {!item.available && (
      <div className="overlay">
        ❌ Unavailable
      </div>
    )}
              <img src={item.image} alt={item.name} />
            </div>
         

          {sauce && sauce.toLowerCase() !== "none" && (
            <h5>{sauce} sauce</h5>
          )}

        </div>
      );
    })}
  </div>

</div>
  
  );
})}
      </div>         
 </div>
                 <div className="bananaLeaf-group">
                <div className="container-subtitle">
                  <h3>Banana Leaf $6.00</h3>
                  </div>
                
              <div className="cornHusk-list" >

{fillingsOrder.map((filling) => {
  const items = getTamalesByFilling("Banana Leaf", filling);

  if (items.length === 0) return null;

  return (
    <div key={filling} className="item-list">

  {/* LEFT SIDE (fixed width) */}
  <div className="filling-name">
    <h2>{filling}</h2>
  </div>

  {/* RIGHT SIDE (flex area) */}
  <div className="filling-items">
    {items
       .filter((item) => item.visible !== false)
    .map((item) => {
      const sauce = getProperty(item, "Sauce");

      return (
        <div key={item.id} className="item-box">
<div className="item-image">
    {/* 🔥 ONE label only */}
  {(item.remaining !== null && item.remaining !== undefined) && (
    <div className="status-label">
      {item.remaining === 0
        ? "Sold Out"
        : `Only ${item.remaining} left`}
    </div>
  )}


    {/* 🔥 OVERLAY */}
    {!item.available && (
      <div className="overlay">
        ❌ Unavailable
      </div>
    )}
              <img src={item.image} alt={item.name} />
            </div>
         

          {sauce && sauce.toLowerCase() !== "none" && (
            <h5>{sauce} sauce</h5>
          )}

        </div>
      );
    })}
  </div>

</div>
  
  );
})}
      </div>         
 </div>
            </div>

            </div>
<div className="multiple-sections-container">

    <div className="section-container drinks-section">
      <div className="container-title"><h1>DRINKS</h1></div>
        {/* 🔥 GROUPED ITEMS */}
  {drinksSection?.groups?.map((group) => (
    <div key={group.id} className="drink-group">

      <div className="container-subtitle">
        <h3>{group.groupName}</h3>
      </div>
<div className="vertical">
  {group.items
    .filter((item) => item.visible !== false)
    .map((item) => (
      <div key={item.id} className="section-vertical-list">
        <div className="item-price-name">
          <h4 className={!item.available ? "unavailable" : ""}>
            ${item.price} {item.name}

            {(item.remaining !== null &&
              item.remaining !== undefined) && (
              <span className="remaining-text">
                {item.remaining === 0
                  ? " Sold Out"
                  : ` ${item.remaining} left`}
              </span>
            )}
          </h4>
        </div>
      </div>
    ))}
</div>
      
      </div>
  
  ))}

 {/* 🔥 UNGROUPED ITEMS */}
  {drinksSection?.items?.length > 0 && (
    <div className="dynamic-items-list">
      <div className="vertical">
      {drinksSection.items
       .filter((item) => item.visible !== false)
      .map((item) => (
        
        <div key={item.id} className="section-vertical-list">
        <div className="item-price-name">
          <h4 className={!item.available ? "unavailable" : ""}>
            ${item.price} {item.name}

            {(item.remaining !== null &&
              item.remaining !== undefined) && (
              <span className="remaining-text">
                {item.remaining === 0
                  ? " Sold Out"
                  : ` ${item.remaining} left`}
              </span>
            )}
          </h4>
        </div>
      </div>
      ))}
      </div>
    </div>
  )}

    </div>

    <div className="section-container doule-section-container"> 
      <div className="first-section soup-section">
        <div className="container-title"><h1>SOUPS</h1></div>
                 <div className="section-vertical-list">
        {soupsSection?.items
        ?.filter((item) => item.visible !== false)
        .map((item) => (
          <div key={item.id || item._id} className="section-vertical-list">

             <div className="item-price-name">
          <h4 className={!item.available ? "unavailable" : ""}>
            ${item.price} {item.name}

            {(item.remaining !== null &&
              item.remaining !== undefined) && (
              <span className="remaining-text">
                {item.remaining === 0
                  ? " Sold Out"
                  : ` ${item.remaining} left`}
              </span>
            )}
          </h4>
        </div>

         

          </div>
        ))}
             </div>
      </div>
      <div className="second-container antojo-section">
           <div className="container-title"><h1>ANTOJOS</h1></div>
  <div className="section-vertical-list">
  {antojosSection?.items
    ?.filter((item) => item.visible !== false)
    .map((item) => (
      <div key={item.id || item._id} className="section-verticl-list">
        <div className="item-price-name">
          <h4 className={!item.available ? "unavailable" : ""}>
            ${item.price} {item.name}

            {(item.remaining !== null &&
              item.remaining !== undefined) && (
              <span className="remaining-text">
                {item.remaining === 0
                  ? " Sold Out"
                  : ` ${item.remaining} left`}
              </span>
            )}
          </h4>
        </div>
      </div>
    ))}
</div>
      </div>
             
             </div>

    <div className="section-container sides-section">  
  <div className="container-title">
    <h1>SIDES</h1>
  </div>

  <div className="section-vertical-list">
    {sides.map((item) => (
      <div key={item.id || item._id} className="item-container">

        <div className="item-price-name vertical-list">
   <h4 className={!item.available ? "unavailable" : ""}>
  {item.name}
            </h4>

     
           {/* 🔥 SHOW MODIFIERS */}
          {item.modifiers?.map((mod) => (
            <div key={mod.id}>
              <h5>${mod.price}-{mod.name}</h5>
             
            </div>
            
          ))}
</div>

         
          </div>
       

    ))}
  </div>
</div>

</div>

        </div>
        </div>
    )
}
export default DigitalMenu;