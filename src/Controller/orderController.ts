import { Request, Response, NextFunction } from "express";
import orderModel from "../Models/order.model";
import userModel from "../Models/user.model";
interface userRequest extends Request {
  user?: any;
}
const orderController = {
  createOrder: async (req: userRequest, res: Response) => {
    const { _id } = req.user;
    const { coupon } = req.body;
    const userCart = await userModel
      .findById(_id)
      .select("cart")
      .populate("cart.product.id", "title price");
    const products = userCart?.cart?.map((el) => {
      return {
        product: el.product?.id.toString(),
        count: el.quantity,
        color: el.color,
      };
    });
    let total = userCart.cart.reduce((sum, prev) => {
      return sum + (prev.quantity as number) * prev.product.price;
    }, 0);
    if (coupon) total = Math.round((total * (1 - +coupon / 100)) / 1000) * 1000;
    const resp = await orderModel.create({ products, total, orderBy: _id });

    return res.status(200).json({
      success: resp ? true : false,
      creadedOrder: resp ? resp : "Something want wrong",
    });
  },

  upldateStatus:async(req:Request, res:Response)=>{
    const {oid}= req.params;
    const {status}= req.body;
    if(!status) return res.status(403).json("Missing inputs")
    const response=await orderModel.findByIdAndUpdate(oid,{status},{new: true})
    return res.status(200).json({
      success: response ? true : false ,
      response: response ? response : 'can not update status'
    })
  },
  getUserOrder:async(req:userRequest, res:Response)=>{
    const {_id}= req.user
    const response=await orderModel.find({orderBy:_id})
    return res.status(200).json({
      success: response ? true : false ,
      response: response ? response : 'can not update status'
    })
  },

  getAdminOrder:async(req:userRequest, res:Response)=>{
   
    const response=await orderModel.find({})
    return res.status(200).json({
      success: response ? true : false ,
      response: response ? response : 'can not update status'
    })
  },
};

export default orderController;
