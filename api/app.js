const express = require("express");
const app = express();
const errorMiddleware = require("./middleware/error.js");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");
const path = require("path");

// Middleware setup
app.use(express.json({ limit: "50mb" })); // Increase the limit for JSON payload
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" })); // Increase the limit for URL encoded payloads
app.use(fileUpload({ limits: { fileSize: 50 * 1024 * 1024 } })); // Set limit for file uploads to 50MB
dotenv.config({ path: "api/config/config.env" });

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

// Route imports
const product = require("./routes/productRoute.js");
const category = require("./routes/categoryRoute.js");
const user = require("./routes/userRoute.js");
const order = require("./routes/orderRoute.js");
const payment = require("./routes/paymentRoute.js");
const contact = require("./routes/contactRoute.js");

app.use("/api/v1", product);
app.use("/api/v1", category);
app.use("/api/v1", user);
app.use("/api/v1", order);
app.use("/api/v1", payment);
app.use("/api/v1", contact);

// Serve static files
app.use(express.static(path.join(__dirname, "../client/build")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/build/index.html"));
});

// Middleware for Errors
app.use(errorMiddleware);

module.exports = app;
