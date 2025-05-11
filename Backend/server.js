const express = require("express");
const connectDb = require("./config/dbConnection");
const dotenv = require("dotenv").config();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const errorHandler = require('../Backend/middleware/erroHandler');
const userRoutes = require('./routes/userRoutes');
const expenseRoutes = require('./routes/expenseRoutes');
const validateToken = require('./middleware/validateToken')


connectDb();
const app = express();
const port = process.env.PORT || 5000;

app.use(cookieParser());
app.use(express.json());
app.use("/api/user",userRoutes);

app.get("/api/test", (req, res, next) => {
  console.log("✅ Hit /api/test route");
  next();
}, validateToken, (req, res) => {
  res.json({ message: "Token validated successfully", user: req.user });
});


console.log("➡️ Registering /api/expense route");
app.use("/api/expense",expenseRoutes);
app.use(errorHandler);


app.listen(port,() => {
    console.log("Server has started : ",port);
})
