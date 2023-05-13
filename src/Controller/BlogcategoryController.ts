import { Request, Response, NextFunction } from "express";
import BlogModel from "../Models/blogcategory.model";

const BlogController = {
  createBlog: async (req: Request, res: Response) => {
    const category =await BlogModel.create(req.body);
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
    const getAllBlog=await BlogModel.find({})
    return res.status(200).json({
        success: getAllBlog ? true : false,
        getBlog: getAllBlog
          ? getAllBlog
          : "Can not  get All blog",
    })
  },
  updateBlog:async(req: Request, res: Response)=>{
    const {_id}=req.params;
    const updateBlog=await BlogModel.findByIdAndUpdate(_id,req.body,{new: true})
    return res.status(200).json({
        success: updateBlog ? true : false,
        updatedBlog: updateBlog
          ? updateBlog
          : "Can not update blog",
    })
  },
   deleteBlog:async(req: Request, res: Response)=>{
    const {_id}=req.params;
    const deleteBlog=await BlogModel.findByIdAndDelete(_id)
    return res.status(200).json({
        success: deleteBlog ? true : false,
        deletedBlog: deleteBlog
          ? deleteBlog
          : "Can not delete blog",
    })
  },
};

export default BlogController;
