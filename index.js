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

// router
app.use("/api/users", require("./routes/userRouter"));
app.use("/api/auth", require("./routes/authRouter"));
app.use("/api/posts", require("./routes/postRouter"));

app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`);
});
