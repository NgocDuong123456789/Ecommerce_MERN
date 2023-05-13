import mongoose, { Schema, Model } from "mongoose";
import bcrypt from "bcrypt";
import CryptoJS from "crypto";
export interface blogcategoryDocument extends mongoose.Document {
  title: string;
}

const blogCategorySchema: Schema<blogcategoryDocument> = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true, index: true },
  },
  
  {
    timestamps: true,
    collection: "BlogCategory",
  }
);

const BlogModel: Model<blogcategoryDocument> = mongoose.model("BlogCategory", blogCategorySchema);
export default BlogModel;
