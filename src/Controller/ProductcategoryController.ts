import { Request, Response } from "express";
import productCategoryModel from "../Models/productCategory.model";

const BlogController = {
  createBlog: async (req: Request, res: Response) => {
    const category =await productCategoryModel.create(req.body);
    return res
      .status(200)
      .json({
        success: category ? true : false,
        createdBlog: category
          ? category
          : "Can not create blog",
      });
  },
  
  getBlog:async(req: Request, res: Response)=>{
    const getAllBlog=await productCategoryModel.find({})
    return res.status(200).json({
        message: getAllBlog ?'lấy sản phẩm trong category thành công !' : 'lấy sản phẩm trong category thất bại',
        data:
          getAllBlog
          ? getAllBlog
          : "Can not  get All blog",
    })
  },

  updateBlog:async(req: Request, res: Response)=>{
    const {_id}=req.params;
    const updateBlog=await productCategoryModel.findByIdAndUpdate(_id,req.body,{new: true})
    return res.status(200).json({
        success: updateBlog ? true : false,
        updatedBlog: updateBlog
          ? updateBlog
          : "Can not update blog",
    })
  },
  
   deleteBlog:async(req: Request, res: Response)=>{
    const {_id}=req.params;
    const deleteBlog=await productCategoryModel.findByIdAndDelete(_id)
    return res.status(200).json({
        success: deleteBlog ? true : false,
        deletedBlog: deleteBlog
          ? deleteBlog
          : "Can not delete blog",
    })
  },
};

export default BlogController;
