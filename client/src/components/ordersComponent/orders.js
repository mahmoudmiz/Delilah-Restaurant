import React from "react";
import "./ordersStyles.css";
class Orders extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ordersItems: [
        {
          deliveryStatus: "new",
          createdAt: "12:30 pm",
          id: "1",
          description: "1x ham with double cheese",
          payment_method: "tarjeta",
          price: "2300",
          userName: "john whick",
          address: "385 fedrico chopin ",
        },
        {
          deliveryStatus: "new",
          createdAt: "12:30 pm",
          id: "9",
          description: "1x ham with double cheese",
          payment_method: "tarjeta",
          price: "2300",
          userName: "john whick",
          address: "385 fedrico chopin ",
        },
        {
          deliveryStatus: "new",
          createdAt: "12:30 pm",
          id: "7",
          description: "1x ham with double cheese",
          payment_method: "tarjeta",
          price: "2300",
          userName: "john whick",
          address: "385 fedrico chopin ",
        },
        {
          deliveryStatus: "new",
          createdAt: "12:30 pm",
          id: "6",
          description: "1x ham with double cheese",
          payment_method: "tarjeta",
          price: "2300",
          userName: "john whick",
          address: "385 fedrico chopin ",
        },
      ],
    };
  }

  render() {
    return (
      <table className="orders">
        <thead>
          <tr>
            <th>
              Status <i className="fas fa-sort"></i>
            </th>
            <th>
              Time <i className="fas fa-sort"></i>
            </th>
            <th>Number</th>
            <th>Description</th>
            <th>Price</th>
            <th>User</th>
            <th>Address</th>
          </tr>
        </thead>
        <tbody className="orders__items">
          {this.state.ordersItems.map((item) => {
            return (
              <tr key={item.id}>
                <td className="orders__item__deliveryStatus">
                  <select name="deliveryStatus" id="deliveryStatus">
                    <option value="new">New</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="sent">Sent</option>
                    <option value="delivered">Delivered</option>
                  </select>
                </td>

                <td className="orders__item__time">{item.createdAt}</td>

                <td className="orders__item__id">#{item.id}</td>

                <td className="orders__item__description">
                  {item.description}
                </td>

                <td className="orders__item_price">
                  <i className="far fa-credit-card"></i> {item.price}
                </td>

                <td className="orders__item_userName">{item.userName}</td>

                <td className="orders__item_address">{item.address}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
}

export default Orders;
