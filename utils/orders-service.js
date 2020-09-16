const Product = require("./../models/Product");
const ProductOrder = require("./../models/ProductOrder");

module.exports = {
  finalPrice: async (req, res) => {
    if (req.body.products && req.body.products.length > 0) {
      let finalOrderPrice = 0;
      for (const item of req.body.products) {
        const product = await Product.findByPk(item.id);
        if (product !== null) {
          finalOrderPrice += Number(product.price) * Number(item.qty);
        }
      }
      if (finalOrderPrice) {
        return finalOrderPrice;
      } else {
        throw new Error("missing or bad values");
      }
    }
  },

  createProductOrder: async (req, savedOrder) => {
    for (const p of req.body.products) {
      const product = await Product.findByPk(p.id);
      // Create and save a productOrder
      if (product !== null) {
        const SavedproductOrder = await ProductOrder.create({
          orderId: savedOrder.id,
          productId: p.id,
          quantity: p.quantity,
        });
      } else {
        throw new Error("product does not exist");
      }
    }
  },
};
