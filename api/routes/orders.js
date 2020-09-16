const express = require("express");
const router = express.Router();
const Product = require("./../../models/Product");
const userAuth = require("../middleware/user-auth");
const adminAuth = require("./../middleware/admin-auth");
const User = require("./../../models/User");
const Order = require("./../../models/Order");
const ProductOrder = require("./../../models/ProductOrder");
const userServices = require("../../utils/users-service");
const orderServices = require("./../../utils/orders-service");

//create  new order
router.post("/", userAuth, async (req, res) => {
  try {
    const userData = await userServices.identifyUser(req);
    const user = await User.findOne({ where: { email: `${userData.email}` } });
    // get the final price
    const finalPrice = await orderServices.finalPrice(req);

    // creat the order
    if (finalPrice !== undefined) {
      const savedOrder = await Order.create({
        userId: user.id,
        price: finalPrice,
        payment_method: req.body.payment_method,
      });

      // create productOrder
      await orderServices.createProductOrder(req, savedOrder);
      res.status(200).json(savedOrder);
    } else {
      res.status(500).json({ message: "Internal server error" });
    }
  } catch (err) {
    console.log(err);
    if (err.errors && err.errors[0].message) {
      return res.status(400).json({ message: err.errors[0].message });
    }
    if (err.message) return res.status(400).json({ message: err.message });
    res.status(500).json({ message: "Internal server error" });
  }
});

// Get all orders
router.get("/", userAuth, async (req, res) => {
  try {
    const userData = await userServices.identifyUser(req);
    const user = await User.findOne({ where: { email: `${userData.email}` } });

    const Orders = await Order.findAll({
      include: [
        {
          model: Product,
          as: "products",
          required: false,
          attributes: ["id", "name"],
          through: {
            model: ProductOrder,
            as: "productOrders",
            attributes: ["quantity"],
          },
        },
      ],
    });

    if (user.is_admin) {
      res.status(200).json({ orders: Orders });
    } else {
      const filteredOrders = Orders.filter((el) => el.userId == user.id);
      res.status(200).json({ orders: filteredOrders });
    }
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
});

//update order status
router.patch("/:orderId", adminAuth, async (req, res) => {
  try {
    const id = req.params.orderId;
    const order = await Order.findByPk(id);
    if (order === null) {
      res.status(404).json({ message: "order does not exist" });
    } else {
      order.state = req.body.state;
      await order.save();
      res.status(200).json(order);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// delte order
router.delete("/:orderId", adminAuth, async (req, res) => {
  try {
    const id = req.params.orderId;
    const order = await Order.findByPk(id);
    if (!order) {
      res.status(404).json({ message: "Order not found" });
    } else {
      const deletedOrder = await order.destroy();
      res.status(200).json({ message: "Order deleted!" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
