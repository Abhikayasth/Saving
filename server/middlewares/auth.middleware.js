import User from "../models/user.model.js"
import { ApiError } from "../utils/ApiError.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import jwt from "jsonwebtoken"
import { refreshAccessToken } from "../controllers/user.controller.js"

export const verifyJWT = asyncHandler(async(req,res,next) => {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")
        
        if(!token){
            throw new ApiError(401,"Unauthorized Request")
        }
    
        let decodeToken;
        try {
          decodeToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        } catch (error) {
          if (error instanceof jwt.TokenExpiredError) {
            return res.status(401).json(new ApiError(401, 'Token Expired'));
          } else {
            throw new ApiError(401, 'Invalid Access Token');
          }
        }
    
        const user = await User.findById(decodeToken?._id).select("-password -refreshToken")
    
        if(!user){
            throw new ApiError(401, "Invalid Access Token")
        }
        req.user = user;
        next()
    } catch (error) {

        throw new ApiError(401, error?.message || "Something went wrong in Auth Middlware")
    }
})