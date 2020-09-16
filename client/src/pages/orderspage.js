import React from "react";
import Orders from "../components/ordersComponent/orders";
import Adminnav from "../components/adminnav/adminnav";

class Orderspage extends React.Component {
  render() {
    return (
      <div className="ordersPage">
        <Adminnav />
        <Orders />
      </div>
    );
  }
}

export default Orderspage;
