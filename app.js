const exp = require("constants");
const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");

const app = express();

require("dotenv/config");

//middleware
app.use(express.json());
app.use(morgan("tiny"));

const api = process.env.API_URL;

const productSchema = mongoose.Schema({
  name: String,
  image: String,
  countInStock: Number,
});

const Product = mongoose.model("Product", productSchema);

app.get(`${api}/products`, (req, res) => {
  const product = {
    id: 1,
    name: "chocos",
    image: "https:www.google.com",
  };
  res.send(product);
});

app.post(`${api}/products`, (req, res) => {
  const product = new Product({
    name: req.body.name,
    image: req.body.image,
    countInStock: req.body.countInStock,
  });

  product
    .save()
    .then((createdProduct) => {
      res.status(201).json(createdProduct);
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
        success: false,
      });
    });
});

mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => {
    console.log("database connected");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(3000, () => {
  console.log(api);
  console.log(`server is running http://localhost:3000`);
});
