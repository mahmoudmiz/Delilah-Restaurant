import React from "react";
import "./addproduct.css";

class Addproduct extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <div className="addproduct">
        <h1>Add a product</h1>
        <form id="addproductForm">
          <input
            className="addproduct__name"
            placeholder="Product Name"
          ></input>
          <input
            className="addproduct__price"
            placeholder="Product Price"
          ></input>

          <input
            className="addproduct__description"
            placeholder="Product Description"
          ></input>
          <input
            className="addproduct__image"
            placeholder="Product image"
          ></input>

          <button className="addproduct__btn">submit</button>
        </form>
      </div>
    );
  }
}

export default Addproduct;
