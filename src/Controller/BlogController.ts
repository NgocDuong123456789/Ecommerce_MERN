import { Request, Response, NextFunction } from "express";
import blogModel from "../Models/Blog.model";
interface AuthenticatedRequest extends Request {
  user?: any;
}

interface fileRequest extends Request {
  file?:any
}
const BlogController = {
  createNewBlog: async (req: Request, res: Response) => {
    const { title, description, category } = req.body;
    if (!title || !description || !category)
      return res.status(403).json("Missing Input");
    const creadedBlogNew = await blogModel.create(req.body);
    return res.status(200).json({
      success: creadedBlogNew ? true : false,
      createdBlog: creadedBlogNew ? creadedBlogNew : "Can not create blog",
    });
  },

  getBlog: async (req: Request, res: Response) => {
    const getAllBlog = await blogModel.find({});
    return res.status(200).json({
      success: getAllBlog ? true : false,
      getBlog: getAllBlog ? getAllBlog : "Can not  get All blog",
    });
  },

  updateBlog: async (req: Request, res: Response) => {
    const { _id } = req.params;
    if (Object.keys(req.body).length === 0)
      return res.status(403).json("Missing inputs");
    const updateBlog = await blogModel.findByIdAndUpdate(_id, req.body, {
      new: true,
    });

    return res.status(200).json({
      success: updateBlog ? true : false,
      updatedBlog: updateBlog ? updateBlog : "Can not update blog",
    });
  },

  deleteBlog: async (req: Request, res: Response) => {
    const { _id } = req.params;
    const deleteBlog = await blogModel.findByIdAndDelete(_id);
    return res.status(200).json({
      success: deleteBlog ? true : false,
      deletedBlog: deleteBlog ? deleteBlog : "Can not delete blog",
    });
  },
  // có 2 nút like và disklink
  // khi người dùng like 1 bài blog thì mình check xem người dùng đó đã disklink hay chưa
  //+ nếu có disklink thì bỏ disklink
  // + nếu k disklink check tiếp ,nếu trước đó người đó like thì bỏ like
  // nếu chưa like thì like
  likeBlog: async (req: AuthenticatedRequest, res: Response) => {
    const { _id } = req.user;
    const { bid } = req.params;
    if (!bid) return res.status(403).json("Missing inputs");
    const blog = await blogModel.findById(bid);
    const alreadlyDiskLike = blog.diskLikes.find(
      (element) => element?.toString() === _id
    );
    const alreadlyLike = blog.likes.find(
      (element) => element?.toString() === _id
    );
    if (alreadlyDiskLike) {
      const blog = await blogModel.findByIdAndUpdate(
        bid,
        { $pull: { diskLikes: _id } },
        { new: true }
      );
      return res.status(200).json({
        success: blog ? true : false,
        blog,
      });
    }
    const isLikes = alreadlyLike;
    if (isLikes) {
      const response = await blogModel.findByIdAndUpdate(
        bid,
        { $pull: { likes: _id } },
        { new: true }
      );
      return res.status(200).json({
        success: response ? true : false,
        response,
      });
    } else {
      const response = await blogModel.findByIdAndUpdate(
        bid,
        { $push: { likes: _id } },
        { new: true }
      );
      return res.status(200).json({
        success: response ? true : false,
        response,
      });
    }
  },
  diskLikeBlog: async (req: AuthenticatedRequest, res: Response) => {
    const { _id } = req.user;
    const { bid } = req.params;
    if (!bid) return res.status(403).json("Missing inputs");
    const blog = await blogModel.findById(bid);
    const alreadlyDiskLike = blog.diskLikes.find(
      (element) => element?.toString() === _id
    );
    const alreadlyLike = blog.likes.find(
      (element) => element?.toString() === _id
    );
    if (alreadlyLike) {
      const response = await blogModel.findByIdAndUpdate(
        bid,
        { $pull: { likes: _id } },
        { new: true }
      );
      return res.status(200).json({
        success: response ? true : false,
        response,
      });
    }
    const isLikes = alreadlyDiskLike;
    if (isLikes) {
      const response = await blogModel.findByIdAndUpdate(
        bid,
        { $pull: { diskLikes: _id } },
        { new: true }
      );
      return res.status(200).json({
        success: response ? true : false,
        response,
      });
    } else {
      const response = await blogModel.findByIdAndUpdate(
        bid,
        { $push: { diskLikes: _id } },
        { new: true }
      );
      return res.status(200).json({
        success: response ? true : false,
        response,
      });
    }
  },

  getOneBlog: async (req: Request, res: Response) => {
    const { bid } = req.params;
    const blog = (
      await blogModel.findByIdAndUpdate(bid,{$inc:{numberView:1}},{new:true}).populate("likes", 'name')
    ).populate("diskLikes", 'name');
    return res.status(200).json({
      success: blog ? true : false,
      blog,
    });
  },
  uploadImageBlog:async(req:fileRequest, res:Response) => {
    const {pid}= req.params
    if(!req.file) return res.status(404).json("missing inputs")
    const response = await blogModel.findByIdAndUpdate(pid,{image:req.file},{new: true});
    return res.status(200).json({
      success: response ? true : false,
      uploadImageBlog: response ? response : "can not image blog"
    })
  }

};

export default BlogController;
