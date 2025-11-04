const express = require("express");
const categoryRoutes = express.Router();

const categoryController = require("../controllers/CategoryController.js");

categoryRoutes.post("/categorias", categoryController.create)
categoryRoutes.get("/categorias", categoryController.list)
categoryRoutes.put("/categorias/{id}", categoryController.update)
categoryRoutes.delete("/categorias/{id}", categoryController.delete)
