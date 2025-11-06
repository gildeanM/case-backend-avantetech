const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./docs/swagger");
const errorHandling = require("./middleware/error-handling");
const cors = require("cors");
require("dotenv").config();
require("express-async-error");

const app = express();
const categoryRoutes = require("./routes/category-routes");
const productsRoutes = require("./routes/products-routes");

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Welcome to the Avanté Tech Backend Challenge API!");
});
app.use("/", categoryRoutes);
app.use("/", productsRoutes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(errorHandling);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})

