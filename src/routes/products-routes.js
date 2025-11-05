const express = require("express");
const productsRoutes = express.Router();

const ProductController = require("../controllers/ProductController");

productsRoutes.post("/produtos", ProductController.create);
productsRoutes.get("/produtos", ProductController.list);
productsRoutes.put("/produtos/:id", ProductController.update);
productsRoutes.delete("/produtos/:id", ProductController.delete);

module.exports = productsRoutes;