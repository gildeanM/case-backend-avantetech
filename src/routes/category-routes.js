const express = require("express");
const categoryRoutes = express.Router();

const CategoryController = require("../controllers/CategoryController.js");

categoryRoutes.post("/categorias", CategoryController.create)
categoryRoutes.get("/categorias", CategoryController.list)
categoryRoutes.put("/categorias/{id}", CategoryController.update)
categoryRoutes.delete("/categorias/{id}", CategoryController.delete)
