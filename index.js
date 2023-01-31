const express = require("express");
const { default: helmet } = require("helmet");
const morgan = require("morgan");
require("dotenv").config();
const PORT = process.env.PORT;

const { connectDB } = require("./config/db");
connectDB();

const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(helmet());
app.use(morgan("common"));

app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`);
});
