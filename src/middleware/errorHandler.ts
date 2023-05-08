import { Request, Response ,NextFunction } from "express"
export const errorHandler=(err:Error,req:Request, res:Response, next:NextFunction)=>{
    const statusCode = res.statusCode===200 ? 500 : res.statusCode
    return res.status(statusCode).json({
        success:false ,
        message: err?.message
    })
}