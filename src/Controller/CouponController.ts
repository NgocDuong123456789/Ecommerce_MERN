import { Request, Response, NextFunction } from "express";
import CouponModel from "../Models/coupon.model";

const CouponController = {
  createCoupon: async (req: Request, res: Response) => {
    const {name, discount, expiry}= req.body;
    if(!name || !discount || !expiry) return res.status(403).json("Missing inputs")
    const category =await CouponModel.create({...req.body, expiry:Date.now()+ expiry*24*60*60*1000});
    return res
      .status(200)
      .json({
        success: category ? true : false,
        createdCoupon: category
          ? category
          : "Can not create Coupon",

      });
  },


  getCoupon:async(req: Request, res: Response)=>{
    const getAllCoupon=await CouponModel.find({}).select('-createdAt -updatedAt')
    return res.status(200).json({
        success: getAllCoupon ? true : false,
        getCoupon: getAllCoupon
          ? getAllCoupon
          : "Can not  get All Coupon",
    })
  },

  updateCoupon:async(req: Request, res: Response)=>{
    const {_id}=req.params;
    if(req.body.expires) req.body.expires = Date.now() + req.body.expires*24*60*1000*60
    const updateCoupon=await CouponModel.findByIdAndUpdate(_id,req.body,{new: true})
    return res.status(200).json({
        success: updateCoupon ? true : false,
        updatedCoupon: updateCoupon
          ? updateCoupon
          : "Can not update Coupon",
    })
  },

   deleteCoupon:async(req: Request, res: Response)=>{
    const {_id}=req.params;
    const deleteCoupon=await CouponModel.findByIdAndDelete(_id)
    return res.status(200).json({
        success: deleteCoupon ? true : false,
        deletedCoupon: deleteCoupon
          ? deleteCoupon
          : "Can not delete Coupon",
    })
  },

};

export default CouponController;
