const express = require("express");
const connectDb = require("./config/dbConnection");
const dotenv = require("dotenv").config();
const cors = require("cors");
const cookieParser = require("cookie-parser");


connectDb();
const app = express();
const port = process.env.PORT || 5000;

const allowedOrigins = [
    "https://expensetracker-slwo.onrender.com",
  ];

app.use(
    cors({
      origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
          callback(null, true);
        } else {
          callback(new Error("Not allowed by CORS"));
        }
      },
      credentials: true, 
    })
  );
  
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'https://expensetracker-slwo.onrender.com');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });

app.options('*', cors()); 
app.use(cookieParser());
app.use(express.json());
app.use("/api/user",require("./routes/userRoutes"));
app.use("/api/expense",require("./routes/expenseRoutes"));


app.listen(port,() => {
    console.log("Server has started : ",port);
})