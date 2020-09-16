const express = require("express");
const app = express();
const db = require("./config/database");
const productRoutes = require("./api/routes/products");
const userRoutes = require("./api/routes/user");
const orderRoutes = require("./api/routes/orders");
const cors = require("cors");
const path = require("path");

const PORT = process.env.PORT || 8080;
app.use(express.json());
app.use(cors());

//connectin to the database
db.authenticate()
  .then(() => {
    console.log("database connected");
  })
  .catch((error) => {
    console.log(error.message);
  });

db.sync({ force: true });

// user routes
app.use("/users", userRoutes);
// products routes
app.use("/products", productRoutes);
// orders routes
app.use("/orders", orderRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(PORT, () => console.log("server running"));
