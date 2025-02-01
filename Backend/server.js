const express = require("express");
const connectDb = require("./config/dbConnection");
const dotenv = require("dotenv").config();
const cors = require("cors");
const cookieParser = require("cookie-parser");


connectDb();
const app = express();
const port = process.env.PORT || 5000;

var whitelist = [
  "http://localhost:5173",
  "https://expensetracker-slwo.onrender.com"
]

app.use(
  cors({
      origin: function (origin, callback) {
          console.log("Request Origin: " + origin)
          if (whitelist.indexOf(origin) !== -1 || !origin) {
              console.log("Allowed by cors: " + origin)
              callback(null, true)
          } else {
              callback(new Error('Not allowed by CORS' + origin))
          }
      },
      credentials: true,
  })
);

app.options('*', cors())

app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (whitelist.includes(origin)) {
      res.setHeader('Access-Control-Allow-Origin', origin);
  };
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

app.use(express.json());
app.use("/api/user",require("./routes/userRoutes"));
app.use("/api/expense",require("./routes/expenseRoutes"));


app.listen(port,() => {
    console.log("Server has started : ",port);
})