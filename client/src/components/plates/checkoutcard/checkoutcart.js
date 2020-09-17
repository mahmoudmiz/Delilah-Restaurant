import React from "react";

import "./checkoutcart.css";
const Checkoutcard = (props) => {
  let total = 0;
  let countItems = 0;
  for (let i of props.checkOut) {
    total += i.price * i.qty;
    countItems += i.qty;
  }
  return (
    <div id="cart" className="cart">
      <h2 className="cart__title">
        you have {countItems > 1 ? countItems + " items" : "1 item"} in your
        cart
      </h2>
      {props.checkOut.map(({ id, name, price, img, qty }, index) => (
        <div key={index} className="cart__item">
          <img alt="flafel" src={img}></img>
          <div className="cart__item__content">
            <h5 className="cart__item__name overflow-ellipsis">{name}</h5>
            <p className="cart__item__price">${price}</p>
            <p className="cart__item__qty">
              {qty} x ${price}
            </p>
          </div>

          {qty > 1 ? (
            <button
              onClick={() => props.handleReduceCount(id)}
              className="item__count__btn"
            >
              -
            </button>
          ) : (
            <button
              onClick={(e) => props.handleDeleteCartItems(id)}
              className="item__remove__btn"
            >
              x
            </button>
          )}
        </div>
      ))}
      <h5 className="cart__total">
        Total: <strong>${total}</strong>
      </h5>
      <h5 className="cart__Payment">Payment Method</h5>
      <select name="Payment" id="Payment" onChange={props.handleDropdownChange}>
        <option value="cash">Cash</option>
        <option value="creditcard">Credit Card</option>
      </select>

      <button
        onClick={props.handleOrderSubmit}
        type="submit"
        className="cart__confirm"
      >
        {" "}
        Confirm Order
      </button>
    </div>
  );
};

export default Checkoutcard;
