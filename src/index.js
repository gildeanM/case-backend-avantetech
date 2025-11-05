const express = require("express");
const errorHandling = require("./middleware/error-handling");
require("dotenv").config();
require("express-async-error");

const PORT = 3000;
const app = express();
const categoryRoutes = require("./routes/category-routes");

app.use(express.json());
app.use("/", categoryRoutes);
app.use(errorHandling);




app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})

