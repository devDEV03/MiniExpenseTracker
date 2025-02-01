const express = require("express");
const connectDb = require("./config/dbConnection");
const dotenv = require("dotenv").config();
const cors = require("cors");
const cookieParser = require("cookie-parser");


connectDb();
const app = express();
const port = process.env.PORT || 5000;


app.use(
    cors({
      origin: "http://localhost:5173",  
      credentials: true,  
    })
  );
app.use(cookieParser());
app.use(express.json());
app.use("/api/user",require("./routes/userRoutes"));
app.use("/api/expense",require("./routes/expenseRoutes"));


app.listen(port,() => {
    console.log("Server has started : ",port);
})