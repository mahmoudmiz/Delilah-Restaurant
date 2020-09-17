import React from "react";
import { HashLink as Link } from "react-router-hash-link";

function PlateItem({ id, name, price, img, added, updateCheckOut }) {
  return (
    <div className="plate">
      <img alt="flafel" src={img}></img>
      <div className="plate__content">
        <h1>{name}</h1>
        <p>${price}</p>
      </div>

      <Link className="plate__add__hashlink" smooth to="/#cart">
        <button onClick={() => updateCheckOut(id)} className="plate__add__btn">
          +
        </button>
      </Link>
    </div>
  );
}

export default PlateItem;
