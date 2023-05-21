import mongoose, { Schema, Model } from "mongoose";
export interface blogcategoryDocument extends mongoose.Document {
  title: string;
  brand:[]
}


const blogCategorySchema: Schema<blogcategoryDocument> = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true, index: true },
    brand:{type:[], required: true}
  },
  
  {
    timestamps: true,
    collection: "productCategory",
  }
);

const productCategoryModel: Model<blogcategoryDocument> = mongoose.model("productCategory", blogCategorySchema);
export default productCategoryModel;
