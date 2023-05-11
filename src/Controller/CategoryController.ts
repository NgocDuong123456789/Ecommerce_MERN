import { Request, Response, NextFunction } from "express";
import CategoryModel from "../Models/Category.model";

const CategoryController = {
  createCategory: async (req: Request, res: Response) => {
    const category =await CategoryModel.create(req.body);
    return res
      .status(200)
      .json({
        success: category ? true : false,
        createdCategory: category
          ? category
          : "Can not create product category",

      });
  },
  getCategory:async(req: Request, res: Response)=>{
    const getAllCategory=await CategoryModel.find({}).select('title  _id')
    return res.status(200).json({
        success: getAllCategory ? true : false,
        getAllCategory: getAllCategory
          ? getAllCategory
          : "Can not  get All product category",
    })
  },
  updateCategory:async(req: Request, res: Response)=>{
    const {_id}=req.params;
    const updateCategory=await CategoryModel.findByIdAndUpdate(_id,req.body,{new: true})
    return res.status(200).json({
        success: updateCategory ? true : false,
        updatedCategory: updateCategory
          ? updateCategory
          : "Can not update product category",
    })
  },
   deleteCategory:async(req: Request, res: Response)=>{
    const {_id}=req.params;
    const deleteCategory=await CategoryModel.findByIdAndDelete(_id)
    return res.status(200).json({
        success: deleteCategory ? true : false,
        deletedCategory: deleteCategory
          ? deleteCategory
          : "Can not delete product category",
    })
  },
};

export default CategoryController;
