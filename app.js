const express = require("express");
const app = express();
require("dotenv").config();
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { isAuthenticated } = require("./middleware/route-guard.middleware")

const Port = process.env.PORT;

app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(cookieParser());

const {
  errorHandler,
  notFoundHandler,
} = require("./middleware/error-handling");

app.use(
  cors({
    origin: ["http://localhost:5173", "http://example.com"], // Add the URLs of allowed origins to this array
  })
);



const usersRouter = require("./routes/user.routes");
app.use("/api", isAuthenticated, usersRouter);


app.use(errorHandler);
app.use(notFoundHandler);

module.exports = app;
