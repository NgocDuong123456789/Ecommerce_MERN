import mongoose, { Schema, Model } from "mongoose";

export interface brandDocument extends mongoose.Document {
  title: string;
}

const brandSchema: Schema<brandDocument> = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true, index: true },
  },
  
  {
    timestamps: true,
    collection: "Brand",
  }
);

const BrandModel: Model<brandDocument> = mongoose.model("Brand", brandSchema);
export default BrandModel;