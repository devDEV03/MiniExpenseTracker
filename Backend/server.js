const express = require("express");
const connectDb = require("./config/dbConnection");
const dotenv = require("dotenv").config();
const cors = require("cors");
const cookieParser = require("cookie-parser");


connectDb();
const app = express();
const port = process.env.PORT || 5000;

const corsOptions = {
    origin: 'https://expensetracker-slwo.onrender.com',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use((req, res, next) => {
    console.log("Incoming Request Headers:", req.headers);
    next();
});

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.options('*', cors(corsOptions)); 
app.use("/api/user",require("./routes/userRoutes"));
app.use("/api/expense",require("./routes/expenseRoutes"));


app.listen(port,() => {
    console.log("Server has started : ",port);
})
