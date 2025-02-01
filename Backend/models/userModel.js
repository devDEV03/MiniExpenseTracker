const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "First Name is mandatory"],
    },
    lastName: {
        type: String,
        required: [true, "Last Name is mandatory"],
      },
    email: {
        type : String,
        required : [true,"Email is mandatory"],
        unique : [true,"Email address already taken"]
  },
    password: {
      type: String,
      required: [true, "Password is mandatory"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User",userSchema);
