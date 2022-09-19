require("dotenv").config();
const express = require("express");
const app = express();
const router = require("./routes/routes");
const PORT = process.env.PORT; // Port comes from .env file

app.use(express.json()); // Body-Parser
app.use(router);

app.listen(PORT, console.log(`Server is running on http://localhost:${PORT}`));
