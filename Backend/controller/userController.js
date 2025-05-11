const bcrypt = require("bcrypt");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const generateAccessToken = require("../util/generateAccessToken");
const generateRefreshToken = require("../util/generateRefreshToken");

const parseExpiryTime = (expiry) => {
    const unit = expiry.slice(-1);
    const value = parseInt(expiry.slice(0, -1), 10);
  
    switch (unit) {
      case "s":
        return value;
      case "m":
        return value * 60;
      case "h":
        return value * 60 * 60;
      case "d":
        return value * 24 * 60 * 60;
      default:
        throw new Error(`Invalid expiry format: ${expiry}`);
    }
  };
  

const registerUser = asyncHandler( async (req,res) => {
    const {firstName,lastName,email,password} = req.body;

    const regexString = /^[^@]+@[^@]+\.[^@]+$/;

    if(!regexString.test(email)){
        res.status(404);
        throw new Error("Enter a valid email");
    }
    if(!firstName || !lastName || !email || !password ){
        res.status(404);
        throw new Error("All the fields are mandatory");
    }

    const existingUser = await User.findOne({email});

    if(existingUser){
        res.status(400);
        throw new Error("User already exists");
    }

    const hashedPassword = await bcrypt.hash(password,10);
    
    const user = await User.create({
        firstName,
        lastName,
        email,
        password : hashedPassword
    })

    if(user){
        const accesstoken = await generateAccessToken(user);  
        const refreshtoken = await generateRefreshToken(user);
        
        
        res.cookie("refreshToken", refreshtoken, {
            httpOnly: true,
            secure: true,
            sameSite: "Strict",
            maxAge: 7 * 24 * 60 * 60 * 1000,
          });

          res.cookie("accessToken", accesstoken, {
            httpOnly: true,
            secure: true,
            sameSite: "Strict",
            maxAge: parseExpiryTime("1h") * 1000, 
          });

        res.status(200).json({user : {
            ...user._doc,
            password : null
        },message : "User Registered"});
    }
    else{
        res.status(400);
        throw new Error("User data is not valid");
    }
})


const loginUser = asyncHandler(async (req,res) => {
    
    const { email,password } = req.body;
    
    if(!email || !password){
        res.status(404);
        throw new Error("All the fields are mandatory");
    }

    const user = await User.findOne({email});

    if(user && (await bcrypt.compare(password,user.password))){
        const accesstoken = await generateAccessToken(user);
        const refreshtoken = await generateRefreshToken(user);
        
        res.cookie("refreshToken", refreshtoken, {
            httpOnly: true,
            secure: false, 
            sameSite: "Strict",
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
          });

           res.cookie("accessToken", accesstoken, {
            httpOnly: true,
            secure: true,
            sameSite: "Strict",
            maxAge: parseExpiryTime("1h") * 1000, 
          });
        
        res.status(200).json({user,message : "User Logged In"});
    }
    else{
        res.status(404).json({message : "Incorrect Email or Password"});
    }
})

const updateUser = async (req,res) => {
    try{
        const {firstName} = req.body;
        const {id} = req.params;

        const user = User.findOne({_id : id});

        if(!user){
            res.status(404).message({
                message : "User not found"
            });
            throw new Error("User not found");
        }else{
            await User.updateOne({
                firstName
            });
        }

        res.status(200).message({
            message : "User details successfully updated"
        })
    
    }
    catch(error){
        res.status(404).message({
            message : "Unable to update user's details"
        })
    }
}

const getAccessTokenUsingRefreshToken = asyncHandler(async (req,res) => {

    try{
        const refreshToken = req.cookies.refreshToken;

        if (!refreshToken) {
            return res.status(401).json({ message: "Refresh Token not found" });
        }

        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async (err, decoded) => {
            if (err) {
                return res.status(403).json({ message: "Invalid or Expired Refresh Token" });
            }

            const user = await User.findById(decoded.id);
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            const newAccessToken = generateAccessToken(user);

            res.status(200).json({ accessToken: newAccessToken });
        });

    }catch(error){
        console.error("Refresh Token Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

module.exports = {loginUser, registerUser, getAccessTokenUsingRefreshToken,updateUser};
