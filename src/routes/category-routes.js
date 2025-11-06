const express = require("express");
const categoryRoutes = express.Router();

const CategoryController = require("../controllers/CategoryController");

/**
 * @swagger
 * tags:
 *   name: Categories
 *   description: Category management endpoints
 */

/**
 * @swagger
 * /categorias:
 *   post:
 *     summary: Create a new category
 *     tags: [Categories]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Electronics"
 *               description:
 *                 type: string
 *                 example: "Devices and accessories"
 *     responses:
 *       201:
 *         description: Category created successfully
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
 *       400:
 *         description: Validation error (Zod)
 *         content:
 *           application/json:
 *             examples:
 *               MissingName:
 *                 summary: Name is required
 *                 value:
 *                   message: "Validation error."
 *                   issues:
 *                     - field: "name"
 *                       message: "Name is required."
 *               NameTooLong:
 *                 summary: Name exceeds the character limit
 *                 value:
 *                   message: "Validation error."
 *                   issues:
 *                     - field: "name"
 *                       message: "The name must contain a maximum of 100 characters."
 *               DescriptionTooLong:
 *                 summary: Description exceeds character limit
 *                 value:
 *                   message: "Validation error."
 *                   issues:
 *                     - field: "description"
 *                       message: "The description should contain a maximum of 255 characters."
 *       404:
 *         description: Category already exists
 *         content:
 *           application/json:
 *             example:
 *               message: "Category already exists."
 *       500:
 *         description: Unexpected server error
 *         content:
 *           application/json:
 *             example:
 *               message: "Internal server error."
 */
categoryRoutes.post("/categorias", CategoryController.create);

/**
 * @swagger
 * /categorias:
 *   get:
 *     summary: Get all categories
 *     tags: [Categories]
 *     responses:
 *       200:
 *         description: List of categories
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
 *       500:
 *         description: Unexpected server error
 *         content:
 *           application/json:
 *             example:
 *               message: "Internal server error."
 */
categoryRoutes.get("/categorias", CategoryController.list);

/**
 * @swagger
 * /categorias/{id}:
 *   put:
 *     summary: Update an existing category
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the category to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Updated Electronics"
 *               description:
 *                 type: string
 *                 example: "Updated description"
 *     responses:
 *       200:
 *         description: Category updated successfully
 *       400:
 *         description: Validation error (Zod)
 *         content:
 *           application/json:
 *             example:
 *               message: "Validation error."
 *               issues:
 *                 - field: "name"
 *                   message: "Name is required."
 *                 - field: "description"
 *                   message: "The description should contain a maximum of 255 characters."
 *       404:
 *         description: Category not found
 *         content:
 *           application/json:
 *             example:
 *               message: "Category not find."
 *       500:
 *         description: Unexpected server error
 *         content:
 *           application/json:
 *             example:
 *               message: "Internal server error."
 */
categoryRoutes.put("/categorias/:id", CategoryController.update);

/**
 * @swagger
 * /categorias/{id}:
 *   delete:
 *     summary: Delete a category by ID
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the category to delete
 *     responses:
 *       200:
 *         description: Category deleted successfully
 *       404:
 *         description: Category not found
 *         content:
 *           application/json:
 *             example:
 *               message: "Category not find."
 *       500:
 *         description: Unexpected server error
 *         content:
 *           application/json:
 *             example:
 *               message: "Internal server error."
 */
categoryRoutes.delete("/categorias/:id", CategoryController.delete);

module.exports = categoryRoutes;
