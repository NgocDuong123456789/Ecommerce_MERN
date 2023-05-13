import mongoose, { Schema, Model } from "mongoose";

interface productOrderType {
  product: mongoose.Schema.Types.ObjectId;
  count: number;
  color: string;
}
// thanh toán online
// stripe dùng thư viện
export interface ordergoryDocument extends mongoose.Document {
  products: productOrderType[];
  status: string;
  orderBy: mongoose.Schema.Types.ObjectId;
  total: number;
  compon:mongoose.Schema.Types.ObjectId;
}

const orderSchema: Schema<ordergoryDocument> = new mongoose.Schema(
  {
    products: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: "Products" },
        count: Number,
        color: String,
      },
    ],
    status: {
      type: String,
      default: "Processing",
      enum: ["Cancelled", "Processing", "Successed"],
    },
   total:Number,
   compon:{
    type: mongoose.Schema.Types.ObjectId,ref:'Coupon'
   },
    orderBy: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  },

  {
    timestamps: true,
    collection: "order",
  }
);

const orderModel: Model<ordergoryDocument> = mongoose.model(
  "order",
  orderSchema
);
export default orderModel;
