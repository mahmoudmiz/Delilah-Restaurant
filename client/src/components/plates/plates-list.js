import React from "react";
import "./plates-list.css";
import PlateItem from "./plate-item";
import Checkoutcard from "./checkoutcard/checkoutcart";
import { withRouter } from "react-router-dom";

class PlatesList extends React.Component {
  constructor() {
    super();

    this.state = {
      plateslist: [
        {
          id: 1,
          name: "Fried chicken",
          price: "600",
          img:
            "https://insanelygoodrecipes.com/wp-content/uploads/2020/03/cracker-barrel-fried-chicken-1024x536.png",
        },
        {
          id: 2,
          name: "sushi",
          price: "400",
          img:
            "https://www.nippon.com/es/ncommon/contents/japan-data/170454/170454.jpg",
        },
        {
          id: 3,
          name: "Pizza x large large large",
          price: "400",
          img:
            "https://cdn2.cocinadelirante.com/sites/default/files/styles/gallerie/public/images/2017/04/pizzapepperoni0.jpg",
        },
        {
          id: 4,
          name: "Steak with fries",
          price: "500",
          img:
            "https://media.blogto.com/listings/20181109-HarrysSteak3.jpg?w=2048&cmd=resize_then_crop&height=1365&quality=70",
        },
        {
          id: 5,
          name: "Steak with fries",
          price: "500",
          img:
            "https://media.blogto.com/listings/20181109-HarrysSteak3.jpg?w=2048&cmd=resize_then_crop&height=1365&quality=70",
        },
        {
          id: 6,
          name: "Steak with fries",
          price: "500",
          img:
            "https://media.blogto.com/listings/20181109-HarrysSteak3.jpg?w=2048&cmd=resize_then_crop&height=1365&quality=70",
        },
        {
          id: 7,
          name: "Pizza x large",
          price: "400",
          img:
            "https://cdn2.cocinadelirante.com/sites/default/files/styles/gallerie/public/images/2017/04/pizzapepperoni0.jpg",
        },
        {
          id: 8,
          name: "sushi",
          price: "400",
          img:
            "https://www.nippon.com/es/ncommon/contents/japan-data/170454/170454.jpg",
        },
        {
          id: 9,
          name: "Fried chicken",
          price: "600",
          img:
            "https://insanelygoodrecipes.com/wp-content/uploads/2020/03/cracker-barrel-fried-chicken-1024x536.png",
        },
        {
          id: 10,
          name: "Fried chicken",
          price: "600",
          img:
            "https://insanelygoodrecipes.com/wp-content/uploads/2020/03/cracker-barrel-fried-chicken-1024x536.png",
        },
      ],

      checkOut: [],
    };
  }
  handleDeleteCartItems = (id) => {
    let saveState = this.state;
    let newCheckedOut = saveState.checkOut.filter(
      (product) => product.id !== id
    );
    saveState.checkOut = newCheckedOut;

    this.setState(saveState);
  };
  handleCheckOutState = (id) => {
    let newState = {
      plateslist: [...this.state.plateslist],
      checkOut: [...this.state.checkOut],
    };

    let newCheckedOut = newState.plateslist.find((product) => product.id == id);
    let product = newState.checkOut.find(
      (product) => product.id == newCheckedOut.id
    );
    if (product !== undefined) {
      product.qty++;
    } else {
      newCheckedOut.qty = 1;
      newState.checkOut.push(newCheckedOut);
    }
    this.setState(newState);
  };
  handleReduceCount = (id) => {
    let newState = {
      plateslist: [...this.state.plateslist],
      checkOut: [...this.state.checkOut],
    };

    for (let p of newState.checkOut) {
      if (p.id === id) p.qty--;
    }

    this.setState(newState);
  };

  handleDropdownChange = (e) => {
    let newState = {
      plateslist: [...this.state.plateslist],
      checkOut: [...this.state.checkOut],
      dropDownValue: e.target.value,
    };

    this.setState(newState);
  };
  handleOrderSubmit = (e) => {
    e.preventDefault();
    const payLoad = {
      products: this.state.checkOut.map((item) => ({
        id: item.id,
        qty: item.qty,
      })),
      payment_method: this.state.dropDownValue || "cash",
    };

    const token = localStorage.getItem("token");
    console.log(typeof token);

    fetch("/orders", {
      method: "post",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
        Authorization: "Bearer" + " " + token,
      },
      body: JSON.stringify(payLoad),
    })
      .then((res) => {
        if (res.status === 200) {
          this.props.history.push("./orders");
        }

        return res.json();
      })
      .then((res) => console.log(res));
  };
  render() {
    return (
      <div className="plates">
        <h1>Recommended Dishes</h1>
        <div className="products__cart">
          <div className="plateLists">
            {this.state.plateslist.map(
              ({ id, name, price, img, added }, index) => (
                <PlateItem
                  key={index}
                  id={id}
                  name={name}
                  price={price}
                  img={img}
                  added={added}
                  updateCheckOut={this.handleCheckOutState}
                />
              )
            )}
          </div>
          {this.state.checkOut.length > 0 ? (
            <Checkoutcard
              {...this.state}
              handleDeleteCartItems={this.handleDeleteCartItems}
              handleReduceCount={this.handleReduceCount}
              handleOrderSubmit={this.handleOrderSubmit}
              handleDropdownChange={this.handleDropdownChange}
            />
          ) : null}
        </div>
      </div>
    );
  }
}

export default withRouter(PlatesList);
