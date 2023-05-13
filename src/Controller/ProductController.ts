import productModel from "../Models/Product.model";
import slugify from "slugify";
import flatted from "flatted";
import { Request, Response, NextFunction } from "express";
interface FilteredQuery {
  [key: string]: any;
}
interface softQuery {
  [sort: string]: any;
}
interface AuthenticatedRequest extends Request {
  user?: any;
}
export const productController = {
  createProduct: async (req: Request, res: Response, next: NextFunction) => {
    if (Object.keys(req.body).length === 0)
      return res.status(400).json("Missing inputs");
    if (req.body && req.body.title)
      req.body.slug = slugify(req.body.title, "-");
    const newProduct = await productModel.create(req.body);
    return res.status(200).json({
      success: newProduct ? true : false,
      createdProduct: newProduct ? newProduct : "can not creat new product",
    });
  },

  getProduct: async (req: Request, res: Response) => {
    const { _id } = req.params;
    const productDetail = await productModel.findById(_id);
    return res.status(200).json({
      success: productDetail ? true : false,
      productDetail: productDetail
        ? productDetail
        : "can not get product detail",
    });
  },

  getAllProduct: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const queries = { ...req.query };
      // tách các trường đặt biệt ra khỏi query
      const excludeFields = ["limit", "sort", "page", "fields", "order"];
      excludeFields.forEach((e1) => delete queries[e1]);

      const filterQuery: FilteredQuery = {};
      for (let key in queries) {
        let value = queries[key];
        if (key === "title") {
          value = { $regex: value, $options: "i" };
        }
        if (key === "rating") {
          value = value;
        }
        if (key === "price") {
          value = value;
        }
        if (key === "price_min") {
          value = String({ $gte: +value });
        }
        if (key === "price_max") {
          value = String({ $lte: +value });
        }
        filterQuery[key] = value;
      }
      let data = productModel.find(filterQuery);
      const softQuery: softQuery = {};
      if (req.query.sort && req.query.order) {
        const sortFields = req.query.sort.toString().split(",").join(" ");
        const sortDirection =
          req.query.order.toString().split(",").join(" ") === "desc" ? -1 : 1;
        softQuery[sortFields] = sortDirection;
        data = data.sort(softQuery);
      }
      // fields
      if (req.query.fields) {
        const fields = req.query.fields.toString().split(",").join(" ");
        data.select(fields);
      }
      //panigation
      // limit : số sản phẩm có trong 1 trang khi gọi api
      //skip: số trang
      const page = +req.query.page || 1;
      const limit = +req.query.limit || process.env.LIMIT_PRODUCT;
      const skip = (page - 1) * (limit as number);
      data.skip(skip).limit(limit as number);

      const counts = await productModel.find(filterQuery).countDocuments();
      data.exec().then((response) => {
        return res.status(200).json({
          success: data ? true : false,
          product: response,
          counts,
        });
      });
    } catch (err) {
      console.error(err);
    }
  },

  updateProduct: async (req: Request, res: Response) => {
    const { _id } = req.params;
    if (req.body && req.body.title)
      req.body.slug = slugify(req.body.title, "-");
    const updatedProduct = await productModel.findByIdAndUpdate(_id, req.body, {
      new: true,
    });

    return res.status(200).json({
      success: updatedProduct ? true : false,
      product: updatedProduct,
      message: "update product successfully",
    });
  },
  deleteProduct: async (req: Request, res: Response) => {
    const { _id } = req.params;
    const deletedProduct = await productModel.findByIdAndDelete(_id);
    return res.status(200).json({
      success: deletedProduct ? true : false,
      product: deletedProduct,
      message: "delete product successfully",
    });
  },
  ratings: async (req: AuthenticatedRequest, res: Response) => {
    const { _id } = req.user;

    const { star, comment, pid } = req.body;
    if (!star || !pid) return res.status(402).json("Messing inputs");
    // trường hợp đã có người đánh giá rồi
    const ratingProduct = await productModel.findById(pid);
    const alreadlyRating = ratingProduct.ratings.some(
      (el) => el.postedBy.toString() === _id
    );

    if (alreadlyRating) {
      // user đã đánh giá r
      // update start & comment

      await productModel.updateOne(
        {
          ratings: {
            $elemMatch: {
              // điều kiện này phải tương ứng trường có trong database thì mới update đc
              postedBy: _id,
            },
          },
        },
        {
          $set: {
            "ratings.$.star": star,
            "ratings.$.comment": comment,
            "ratings.$.postedBy": _id,
          },
        },
        { new: true }
      );
    } else {
      // user chưa đánh giá lần nào
      // post start & comment
      const response = await productModel.findByIdAndUpdate(
        pid,
        {
          $push: { ratings: { star, comment, postedBy: _id } },
        },
        { new: true }
      );
    }
    const updateCountProduct = await productModel.findById(pid);
    const ratingCount = updateCountProduct.ratings.length;
    const sumRatings = updateCountProduct.ratings.reduce((sum, prev) => {
      return sum + prev.star;
    }, 0);
    updateCountProduct.totalRangtings = (sumRatings * 10) / ratingCount / 10;
    await updateCountProduct.save();
    return res.status(200).json({
      success: true,
    });
  },

  uploadImageProduct: async (req:Request, res:Response) => {
    return res.json("ok")
  }
};
