import React from "react";
import { Link } from "react-router-dom";
import getDate from "../../helpers/date";

import "./adminnav.css";
function Adminnav() {
  return (
    <nav className="admin__nav">
      <div className="admin__nav__container">
        <div className="admin__nav__logo">
          <h1>Delilah Resto</h1>
          <p>{getDate()}</p>
        </div>

        <div className="admin__navlinks">
          <Link className="admin__navlinks__orders" to="/orders">
            Orders
          </Link>
          <Link className="admin__navlinks__admin" to="/admin">
            Admin
          </Link>
          <Link className="admin__navlinks__addproduct" to="/addproduct">
            Add Product
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Adminnav;
