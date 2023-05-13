import { Request, Response, NextFunction } from "express";
import BrandModel from "../Models/brand.model";

const BrandController = {
  createBrand: async (req: Request, res: Response) => {
    const response =await BrandModel.create(req.body);
    return res
      .status(200)
     
      .json({
        success: response ? true : false,
        createdBrand: response
          ? response
          : "Can not create blog",

      });
  },
  getBrand:async(req: Request, res: Response)=>{
    const response=await BrandModel.find({})
    return res.status(200).json({
        success: response ? true : false,
        getBrand: response
          ? response
          : "Can not  get All blog",
    })
  },
  updateBrand:async(req: Request, res: Response)=>{
    const {_id}=req.params;
    const response=await BrandModel.findByIdAndUpdate(_id,req.body,{new: true})
    return res.status(200).json({
        success: response ? true : false,
        updatedBrand: response
          ? response
          : "Can not update blog",
    })
  },
   deleteBrand:async(req: Request, res: Response)=>{
    const {_id}=req.params;
    const response=await BrandModel.findByIdAndDelete(_id)
    return res.status(200).json({
        success: response ? true : false,
        deletedBrand: response
          ? response
          : "Can not delete blog",
    })
  },
};

export default BrandController;
