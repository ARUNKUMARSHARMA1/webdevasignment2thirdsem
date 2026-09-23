const express = require("express");

const logger = require("./middleware/logger");
const studentRoutes = require("./routes/studentRoutes");

const app = express();

const PORT = 3000;


// Middleware
app.use(express.json());

app.use(logger);


// Home route
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Student Management REST API is running"
  });
});


// Student routes
app.use("/students", studentRoutes);


// 404 Error Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found"
  });
});


// General Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);

  res.status(500).json({
    success: false,
    message: "Internal Server Error"
  });
});


// Start Server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});