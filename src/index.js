const express = require("express");
const errorHandling = require("./middleware/error-handling");
require("dotenv").config();

const PORT = 3000;
const app = express();
const routes = require("./routes");

app.use(express.json());
app.use(routes);
app.use(errorHandling);




app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})

