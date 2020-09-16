import React from "react";
import { Link } from "react-router-dom";
import getDate from "../../helpers/date";
import "./usernav.css";
function usernav() {
  return (
    <nav className="user__nav">
      <div className="user__nav__container">
        <div className="user__nav__logo">
          <h1>Delilah Resto</h1>
          <p>{getDate()}</p>
        </div>

        <div className="user__navlinks">
          <Link className="user__navlinks__orders" to="/orders">
            Orders
          </Link>
          <Link className="user__navlinks__user" to="/profile">
            account
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default usernav;
