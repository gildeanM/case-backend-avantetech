const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./docs/swagger");
const errorHandling = require("./middleware/error-handling");
require("dotenv").config();
require("express-async-error");

const PORT = 3000;
const app = express();
const categoryRoutes = require("./routes/category-routes");
const productsRoutes = require("./routes/products-routes");

app.use(express.json());

app.use("/", categoryRoutes);
app.use("/", productsRoutes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(errorHandling);


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})

