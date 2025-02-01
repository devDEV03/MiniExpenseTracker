const bcrypt = require("bcrypt");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const generateAccessToken = require("../util/generateAccessToken");
const generateRefreshToken = require("../util/generateRefreshToken");

const registerUser = asyncHandler( async (req,res) => {
    const {firstName,lastName,email,password} = req.body;

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
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
          });

        res.status(200).json({accesstoken, user : {
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

    let accesstoken;
    if(user && (await bcrypt.compare(password,user.password))){
        const accesstoken = await generateAccessToken(user);
        const refreshtoken = await generateRefreshToken(user);
        console.log(accesstoken + " " + refreshtoken);
        
        res.cookie("refreshToken", refreshtoken, {
            httpOnly: true,
            secure: false, 
            sameSite: "Strict",
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
          });
        
        res.status(200).json({user,accesstoken,message : "User Logged In"});
    }
    else{
        res.status(404).json({message : "Incorrect Email or Password"});
    }
})

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

module.exports = {loginUser, registerUser, getAccessTokenUsingRefreshToken};
