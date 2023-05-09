import mongoose,{Schema,Model, Types} from "mongoose";

interface rating{
    star:number,
    postedBy:string
}
export interface ProductDocument extends mongoose.Document {
    title: string ,
    slug: string ,
    description: string ,
    brand: string ,
    price: number ,
    category:  mongoose.Types.ObjectId,
    quantity: Number,
    sold:Number
    images:string[]
    color:string
    ratings:rating[]
    totalRangtings:number


}
const productSchema:Schema< ProductDocument> = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    //
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    description: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,ref: "Category" 
    },
    quantity: {
      type: Number,
      default: 0,
    },
    sold: {
      type: Number,
      default: 0,
    },
    images: {
      type:[String],
      default: [],
    },
    color: {
      type: String,
      enum: ["black", "Grown", "Red"],
    },
    ratings: [
      {
        star: { type: Number },
        postedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      },
    ],
    totalRangtings: { type: Number, default: 0 },
  },
  {
    timestamps: true,
    collection: "Product",
  }
);

const productModel:Model<ProductDocument> = mongoose.model("Products", productSchema);
export default productModel
