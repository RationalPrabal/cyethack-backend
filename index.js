require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 8080;
const { authRouter } = require("./routes/auth.routes");
const { productRouter } = require("./routes/product.routes");
const { connection } = require("./configs/database");

app.use(express.json());
app.use(cookieParser());

// Enable CORS with credentials
app.use(
  cors({
    origin: "http://localhost:5173", // Replace with your frontend domain
    credentials: true, // Allow credentials (cookies) to be sent
  })
);

//! routes
app.use("/api/auth", authRouter);
app.use("/api/product", productRouter);

//! database connection and running the server
app.listen(PORT, async () => {
  try {
    await connection;
    console.log("Database connected");
  } catch (err) {
    console.log("Database connection error");
  }
  console.log(`Server is up and running at ${PORT}`);
});
