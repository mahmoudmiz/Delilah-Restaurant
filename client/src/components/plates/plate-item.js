import React from "react";

function PlateItem({ id, name, price, img, added, updateCheckOut }) {
  return (
    <div className="plate">
      <img alt="flafel" src={img}></img>
      <div className="plate__content">
        <h1>{name}</h1>
        <p>${price}</p>
      </div>
      <button onClick={() => updateCheckOut(id)} className="plate__add__btn">
        +
      </button>
    </div>
  );
}

export default PlateItem;
