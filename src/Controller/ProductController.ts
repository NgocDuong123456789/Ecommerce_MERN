import  productModel  from "../Models/Product.model";
import slugify from 'slugify'

import { Request, Response ,NextFunction} from "express";
export const productController={
    createProduct: async (req: Request, res: Response, next: NextFunction)=>{
        if(Object.keys(req.body).length===0) return res.status(400).json("Missing inputs")
        if(req.body && req.body.title) req.body.slug=slugify(req.body.title, '-') 
        const newProduct= await productModel.create(req.body)
        return res.status(200).json({
            success:newProduct ? true : false ,
            createdProduct: newProduct ? newProduct :"can not creat new product"
        })
    },
    getProduct: async(req: Request, res: Response)=>{
        const {_id}= req.params;
        const productDetail= await productModel.findById(_id)
        return res.status(200).json({
            success: productDetail ? true:  false ,
            productDetail:productDetail ? productDetail :"can not get product detail"
        })
    },

    getAllProduct :async (req: Request, res: Response, next: NextFunction)=>{
        const response= await productModel.find({});
        return res.status(200).json({
            success: response ? true : false ,
            product: response ,
            message:'get product successfully'
        })
    },
    updateProduct:async (req: Request, res: Response)=>{
        const {_id}=req.params
        if(req.body && req.body.title) req.body.slug= slugify(req.body.title,'-')
        const updatedProduct= await productModel.findByIdAndUpdate(_id,req.body, {new:true})
        return res.status(200).json({
            success: updatedProduct ? true : false ,
            product: updatedProduct ,
            message:'update product successfully'
        })
    }, 
    deleteProduct: async(req: Request, res: Response) => {
        const {_id}=req.params
        const deletedProduct= await productModel.findByIdAndDelete(_id)
        return res.status(200).json({
            success: deletedProduct ? true : false ,
            product: deletedProduct ,
            message:'delete product successfully'
        })

    }
}

