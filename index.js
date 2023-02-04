const express = require("express");
const { default: helmet } = require("helmet");
const morgan = require("morgan");
require("dotenv").config();
const PORT = process.env.PORT;
const userRoute = require("./routes/userRouter");
const authRoute = require("./routes/authRouter");
const postRoute = require("./routes/postRouter");

const { connectDB } = require("./config/db");
connectDB();

const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(helmet());
app.use(morgan("common"));

// router
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);

app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`);
});
