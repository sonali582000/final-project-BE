// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv").config();

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

const authRoutes = require("./routes/auth.routes");
app.use("/auth", authRoutes);

<<<<<<< HEAD
const commentsRoutes = require("./routes/comment.routes");
app.use("/comments", commentsRoutes)
=======
const eventRoutes = require("./routes/event.routes");
app.use("/event", eventRoutes);
>>>>>>> 67cfbb140120304bf181b5406e3218543c6d7128

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
