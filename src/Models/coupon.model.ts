import mongoose, { Schema, Model } from "mongoose";
export interface couponDocument extends mongoose.Document {
  name: string;
  discount: number;
  expiry: Date;
}

const couponSchema: Schema<couponDocument> = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    discount: { type: Number, required: true },
    expiry: { type: Date, required: true },
  },
  {
    timestamps: true,
    collection: "Coupon",
  }
);

const CouponModel: Model<couponDocument> = mongoose.model(
  "Coupon",
  couponSchema
);
export default CouponModel;
