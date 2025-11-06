const express = require("express");
const productsRoutes = express.Router();

const ProductController = require("../controllers/ProductController");

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Product management endpoints
 */

/**
 * @swagger
 * /produtos:
 *   post:
 *     summary: Create a new product
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - price
 *               - categoryId
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Wireless Headphones"
 *               description:
 *                 type: string
 *                 example: "Bluetooth headphones with noise cancellation"
 *               price:
 *                 type: number
 *                 example: 299.99
 *               categoryId:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       201:
 *         description: Product created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 description:
 *                   type: string
 *                 price:
 *                   type: number
 *                 categoryId:
 *                   type: integer
 *       400:
 *         description: Validation error (Zod) or Prisma validation error
 *         content:
 *           application/json:
 *             examples:
 *               MissingFields:
 *                 summary: Missing required field
 *                 value:
 *                   message: "Validation error."
 *                   issues:
 *                     - field: "name"
 *                       message: "Name is required."
 *               InvalidPrice:
 *                 summary: Invalid price value
 *                 value:
 *                   message: "Validation error."
 *                   issues:
 *                     - field: "price"
 *                       message: "The price has to be a number"
 *                     - field: "price"
 *                       message: "The price has to be greater than 0."
 *               InvalidCategoryId:
 *                 summary: Invalid category reference
 *                 value:
 *                   message: "Validation error."
 *                   issues:
 *                     - field: "categoryId"
 *                       message: "The category ID must be a positive integer."
 *       404:
 *         description: Category not found or product already exists
 *         content:
 *           application/json:
 *             examples:
 *               CategoryNotFound:
 *                 summary: Category doesn't exist
 *                 value:
 *                   message: "Category doesn't exist."
 *               ProductExists:
 *                 summary: Product already exists
 *                 value:
 *                   message: "Product already exists."
 *       500:
 *         description: Unexpected server error
 *         content:
 *           application/json:
 *             example:
 *               message: "Internal server error."
 */
productsRoutes.post("/produtos", ProductController.create);

/**
 * @swagger
 * /produtos:
 *   get:
 *     summary: Get all products
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: List of products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   name:
 *                     type: string
 *                   description:
 *                     type: string
 *                   price:
 *                     type: number
 *                   categoryId:
 *                     type: integer
 *       500:
 *         description: Unexpected server error
 *         content:
 *           application/json:
 *             example:
 *               message: "Internal server error."
 */
productsRoutes.get("/produtos", ProductController.list);

/**
 * @swagger
 * /produtos/{id}:
 *   put:
 *     summary: Update an existing product
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the product to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - price
 *               - categoryId
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Updated Product"
 *               description:
 *                 type: string
 *                 example: "Updated description"
 *               price:
 *                 type: number
 *                 example: 399.99
 *               categoryId:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       200:
 *         description: Product updated successfully
 *       400:
 *         description: Validation error (Zod) or Prisma validation error
 *         content:
 *           application/json:
 *             example:
 *               message: "Validation error."
 *               issues:
 *                 - field: "name"
 *                   message: "Name is required."
 *                 - field: "price"
 *                   message: "The price has to be greater than 0."
 *       404:
 *         description: Product or category not found
 *         content:
 *           application/json:
 *             examples:
 *               ProductNotFound:
 *                 summary: Product does not exist
 *                 value:
 *                   message: "Product not found."
 *               CategoryNotFound:
 *                 summary: Category not found
 *                 value:
 *                   message: "Category not found."
 *       500:
 *         description: Unexpected server error
 *         content:
 *           application/json:
 *             example:
 *               message: "Internal server error."
 */
productsRoutes.put("/produtos/:id", ProductController.update);

/**
 * @swagger
 * /produtos/{id}:
 *   delete:
 *     summary: Delete a product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the product to delete
 *     responses:
 *       200:
 *         description: Product deleted successfully
 *       404:
 *         description: Product not found
 *         content:
 *           application/json:
 *             example:
 *               message: "Product not found."
 *       500:
 *         description: Unexpected server error
 *         content:
 *           application/json:
 *             example:
 *               message: "Internal server error."
 */
productsRoutes.delete("/produtos/:id", ProductController.delete);

module.exports = productsRoutes;
