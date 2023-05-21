import productModel from "../Models/Product.model";
import slugify from "slugify";
import productCategoryModel from '../Models/productCategory.model'
import { productCategory } from "../data/cate_brand";
const data = require("../data/data.json");
import { Request, Response } from "express";

const fn = async (product: any) => {
  await productModel.create({
    title: product?.nameProduct?.nameProduct,
    slug: slugify(product?.nameProduct?.nameProduct) + Math.round(Math.random()*1000) + '',
    description: product?.description,
    brand: product?.brand,
    price: Math.round(
        parseFloat(product?.price?.price.replace(/\D/g, '')) / 100
    ),
    category: product?.category[1],
    quantity: Math.round(Math.random() * 1000),
    sold: Math.round(Math.random() * 100),
    images: product?.imageItem,
    color: product?.variants?.find((el: any) => el.label ===  "Color"),
    image: product?.imageProduct?.image,
    totalRangtings:Math.round(Math.random()*5)
  });
};




export const insertData = async (req: Request, res: Response) => {
  const PromiseProduct = [];
  for (let product of data) PromiseProduct.push(fn(product));
  await Promise.all(PromiseProduct);
  return res.send("done !");
};


const fn2=async(product:{cate: string , brand:string[]})=>{
    await productCategoryModel.create({
        title:product?.cate,
        brand:product?.brand
    })

}
export const insertcategory = async (req: Request, res: Response) => {
    const PromiseProduct = [];
    for (let product of  productCategory) PromiseProduct.push(fn2(product));
    await Promise.all(PromiseProduct);
    return res.send("done !");
  };
