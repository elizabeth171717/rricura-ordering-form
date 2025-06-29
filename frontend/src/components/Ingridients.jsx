import React from "react";

const IngredientsModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="Ingridients-container">
          <div className="tamales">
            <h2>Tamales Ingridients</h2>
            <p>
              <strong>Corn Flour - Maseca</strong>
            </p>
            <p>
              <strong>Lard "pork"</strong>
            </p>
            <p>
              <strong>Salt</strong>
            </p>
            <p>
              <strong>Water</strong>
            </p>
            <p>
              <strong>FILLINGS</strong>
            </p>

            <p>
              <strong>Chicken</strong>: Pulled, all white chicken breast with
              red or green sauce.
            </p>
            <p>
              <strong>Pork</strong>: Pulled pork with red or green sauce.
            </p>
            <p>
              <strong>Rajas</strong>: Bell pepper and cheese with green sauce.
            </p>

            <br />
            <p>
              <strong>Vegan Tamales</strong>: Vegetable oil instead of lard
              filled with vegan cheese, bell pepper and green sauce.
            </p>
          </div>

          <div className="drinks">
            <h2>Drinks Ingredients</h2>

            <p>
              <strong>Aguas Frescas</strong> : Real fruit, sugar and water
            </p>

            <p>
              <strong>Champurrado Atole</strong>: Chocolate abuelita, maizena
              "corn flour", milk, water and sugar.
            </p>
          </div>

          <div className="appetizers">
            <h2>Starters Ingredients</h2>
            <h4>Soups</h4>

            <p>
              <strong>Black Bean Soup</strong>: Black beans, salt and water.
              Served with chopped onion and jalapeño pepper.
            </p>
            <p>
              <strong>Chicken Soup</strong>: Pulled chicken breast and white
              rice.
            </p>
            <br />
            <h4>Antojo</h4>

            <p>
              <strong>Esquite</strong>: White corn kernels boiled and softened
              in water, salt and epazote. served with mayo , cheese and tajin.
            </p>
          </div>
        </div>

        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default IngredientsModal;
