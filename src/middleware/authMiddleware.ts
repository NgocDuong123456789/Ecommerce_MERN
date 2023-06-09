import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";

// protected Routers token base
interface AuthenticatedRequest extends Request {
  user?: any;
}
export const requiredSignIn = (
  req:AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {

    const authHeader = req.headers.authorization
    const accessToken = authHeader && authHeader.split(" ")[1];
   
       console.log(accessToken);
        jwt.verify(
          accessToken,
          process.env.JWT_ACCESS_TOKEN,
          (error:jwt.VerifyErrors, user:jwt.JwtPayload) => {
            if (error) {
                console.log(error)
              return res.status(401).json({
                success: false,
                message: "Token hết hạn",
                error: error,
              });
            }else{
                req.user = user;
                return next();
            }
          }
        );
  } catch (err) {
    console.log(err);
  }
};


export const isAdmin = (req:AuthenticatedRequest, res: Response,next: NextFunction)=>{
  const {role}= req.user;
  if(role !== 1) return res.status(401).json({success: false,message:'Require admin role'})
  else next()
}

