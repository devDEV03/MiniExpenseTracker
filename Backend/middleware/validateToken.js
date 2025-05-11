const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

const validateToken = asyncHandler(async (req,res,next) => {

    const authorizationToken = req.cookies.accessToken;
    
     if (!authorizationToken) {
        res.status(401);
        throw new Error("User is not authorized or token is missing");
    }

    // if(authorizationToken){
    //     token = authorizationToken;
    //     jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,decoded)=> {
    //         if(err){
    //             res.status(401);
    //             throw new Error("User is not verified");
    //         }
    //         console.log(decoded);
    //         req.user = decoded.user;
    //         next();
    //     })

    //     if(!token){
    //         res.status(401);
    //         throw new Error("User is not authorized or token is missing");
    //     }
    // }
    // else{
    //     res.status(401);
    //         throw new Error("User is not authorized or token is missing");
    // }

    try{
       const decoded = jwt.verify(authorizationToken,process.env.ACCESS_TOKEN_SECRET);
       req.user = decoded.user;
       console.log("User validated: ",req.user);
       next();
    }catch(error){
   console.error("Token verification failed:", error.message);
        res.status(401);
        throw new Error("User is not verified");
    }
})

module.exports = validateToken;