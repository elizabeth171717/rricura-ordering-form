// tamalePrices.js
import bananaLeafChicken from "../assets/bananaleafchicken.jpg";
import bananaLeafPork from "../assets/bananaleafpork.jpg";
import rajasTamale from "../assets/rajas.jpg";
import rajasBanana from "../assets/rajasbanana.jpg";
import chickenCornHusk from "../assets/holiday.jpg";
import chickenCornGreen from "../assets/chickengreencorn.jpg";
import porkCornHusk from "../assets/pork.jpg";
import sweetTamale from "../assets/sweettamale.png";
import chipilinTamale from "../assets/chipilintamale.jpg";
import chipilinBanana from "../assets/chipilinbanana.jpg";
import pintoTamale from "../assets/pintotamale.jpg";
import pintoBanana from "../assets/pintotamalebanana.jpg";

import fruitTamale from "../assets/fruittamale.jpg";

const tamalePrices = [
  // Chicken & Pork – Corn Husk ($4), Banana Leaf ($6)
  {
    id: "chicken-cornHusk-green",
    filling: "Chicken",
    wrapper: "Corn Husk",
    sauce: "Green",
    price: 4.0,
    img: chickenCornGreen,
  },
  {
    id: "chicken-cornHusk-red",
    filling: "Chicken",
    wrapper: "Corn Husk",
    sauce: "Red",
    price: 4.0,
    img: chickenCornHusk,
  },
  {
    id: "chicken-cornHusk-tomato",
    filling: "Chicken",
    wrapper: "Corn Husk",
    sauce: "Tomato",
    price: 4.0,
    img: chickenCornHusk,
  },
  {
    id: "pork-cornHusk-green",
    filling: "Pork",
    wrapper: "Corn Husk",
    sauce: "Green",
    price: 4.0,
    img: porkCornHusk,
  },
  {
    id: "pork-cornHusk-red",
    filling: "Pork",
    wrapper: "Corn Husk",
    sauce: "Red",
    price: 4.0,
    img: porkCornHusk,
  },
  {
    id: "pork-cornHusk-tomato",
    filling: "Pork",
    wrapper: "Corn Husk",
    sauce: "Tomato",
    price: 4.0,
    img: porkCornHusk,
  },
  {
    id: "chicken-banana-green",
    filling: "Chicken",
    wrapper: "Banana Leaf",
    sauce: "Green",
    price: 6.0,
    img: bananaLeafChicken,
  },
  {
    id: "chicken-banana-red",
    filling: "Chicken",
    wrapper: "Banana Leaf",
    sauce: "Red",
    price: 6.0,
    img: bananaLeafChicken,
  },
  {
    id: "chicken-banana-tomato",
    filling: "Chicken",
    wrapper: "Banana Leaf",
    sauce: "Tomato",
    price: 6.0,
    img: bananaLeafChicken,
  },
  {
    id: "pork-banana-green",
    filling: "Pork",
    wrapper: "Banana Leaf",
    sauce: "Green",
    price: 6.0,
    img: bananaLeafPork,
  },
  {
    id: "pork-banana-red",
    filling: "Pork",
    wrapper: "Banana Leaf",
    sauce: "Red",
    price: 6.0,
    img: bananaLeafPork,
  },
  {
    id: "pork-banana-tomato",
    filling: "Pork",
    wrapper: "Banana Leaf",
    sauce: "Tomato",
    price: 6.0,
    img: bananaLeafPork,
  },

  // Rajas
  {
    id: "rajas-corn-green",
    filling: "Rajas (pepper & cheese)",
    wrapper: "Corn Husk",
    sauce: "Green",
    price: 4.0,
    vegOil: false,
    img: rajasTamale,
  },
  {
    id: "rajas-corn-red",
    filling: "Rajas (pepper & cheese)",
    wrapper: "Corn Husk",
    sauce: "Red",
    price: 4.0,
    vegOil: false,
    img: rajasTamale,
  },
  {
    id: "rajas-corn-tomato",
    filling: "Rajas (pepper & cheese)",
    wrapper: "Corn Husk",
    sauce: "Tomato",
    price: 4.0,
    vegOil: false,
    img: rajasTamale,
  },
  {
    id: "rajas-banana-green",
    filling: "Rajas (pepper & cheese)",
    wrapper: "Banana Leaf",
    sauce: "Green",
    price: 6.0,
    vegOil: false,
    img: rajasBanana,
  },
  {
    id: "rajas-banana-red",
    filling: "Rajas (pepper & cheese)",
    wrapper: "Banana Leaf",
    sauce: "Red",
    price: 6.0,
    vegOil: false,
    img: rajasBanana,
  },
  {
    id: "rajas-banana-tomato",
    filling: "Rajas (pepper & cheese)",
    wrapper: "Banana Leaf",
    sauce: "Tomato",
    price: 6.0,
    vegOil: false,
    img: rajasBanana,
  },
  {
    id: "rajas-corn-green-vegOil",
    filling: "Rajas (pepper & cheese)",
    wrapper: "Corn Husk",
    sauce: "Green",
    price: 5.0,
    vegOil: true,
    img: rajasTamale,
  },
  {
    id: "rajas-corn-red-vegOil",
    filling: "Rajas (pepper & cheese)",
    wrapper: "Corn Husk",
    sauce: "Red",
    price: 5.0,
    vegOil: true,
    img: rajasTamale,
  },
  {
    id: "rajas-corn-tomato-vegOil",
    filling: "Rajas (pepper & cheese)",
    wrapper: "Corn Husk",
    sauce: "Tomato",
    price: 5.0,
    vegOil: true,
    img: rajasTamale,
  },
  {
    id: "rajas-banana-green-vegOil",
    filling: "Rajas (pepper & cheese)",
    wrapper: "Banana Leaf",
    sauce: "Green",
    price: 7.0,
    vegOil: true,
    img: rajasBanana,
  },
  {
    id: "rajas-banana-red-vegOil",
    filling: "Rajas (pepper & cheese)",
    wrapper: "Banana Leaf",
    sauce: "Red",
    price: 7.0,
    vegOil: true,
    img: rajasBanana,
  },
  {
    id: "rajas-banana-tomato-vegOil",
    filling: "Rajas (pepper & cheese)",
    wrapper: "Banana Leaf",
    sauce: "Tomato",
    price: 7.0,
    vegOil: true,
    img: rajasBanana,
  },

  // Pinto
  {
    id: "pinto-corn",
    filling: "Black Bean",
    wrapper: "Corn Husk",
    sauce: "None",
    price: 4.0,
    vegOil: false,
    img: pintoTamale,
  },

  {
    id: "pinto-banana",
    filling: "Black Bean",
    wrapper: "Banana Leaf",
    sauce: "None",
    price: 6.0,
    vegOil: false,
    img: pintoBanana,
  },

  // Chipilín
  {
    id: "chipilin-corn",
    filling: "Chipilin",
    wrapper: "Corn Husk",
    sauce: "None",

    price: 4.0,
    vegOil: false,
    img: chipilinTamale,
  },

  {
    id: "chipilin-banana",
    filling: "Chipilin",
    wrapper: "Banana Leaf",
    sauce: "None",
    price: 6.0,
    vegOil: false,
    img: chipilinBanana,
  },
  {
    id: "chipilin-corn-vegOil",
    filling: "Chipilin",
    wrapper: "Corn Husk",
    sauce: "None",
    price: 5.0,
    vegOil: true,
    img: chipilinTamale,
  },

  {
    id: "chipilin-banana-vegOil",
    filling: "Chipilin",
    wrapper: "Banana Leaf",
    sauce: "None",
    price: 7.0,
    vegOil: true,
    img: chipilinBanana,
  },

  // Sweet
  {
    id: "sweet-tamale",
    filling: "Sweet Tamale",
    wrapper: "Corn Husk",
    sauce: "None",
    price: 3.0,
    fruit: false,
    img: sweetTamale,
  },
  {
    id: "sweet-fruit-tamale",
    filling: "Sweet Tamale",
    wrapper: "Corn Husk",
    sauce: "None",
    price: 5.0,
    fruit: true,
    img: fruitTamale,
  },
];

export default tamalePrices;
