import mongoose, { Schema, Model } from "mongoose";

import CryptoJS from 'crypto'
export interface userDocument extends mongoose.Document {
  name: string;
  email: string;
  password: string;
  phone: string;
  role: number;
  cart: cartType[];
  address: [];
  isBlocked: boolean;
  refreshToken: string;
  passwordChangedAt: string;
  passwordResetToken: string;
  passwordResetExpries: string;
  wishlist: string[];
  createPasswordChangeToken:()=>string
}

interface cartType{
  product:{id:mongoose.Schema.Types.ObjectId,title: string , price:number};
  color:string 
  quantity:Number
}

const userSchema: Schema<userDocument> = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    address: {type:[], default:[]},
    wishlist: [{ type: mongoose.Types.ObjectId, ref: "Products" }],// dánh sách yêu thích
    role: { type: Number, default: 0 },
    cart:  [{
      product:{id:{type:mongoose.Schema.Types.ObjectId , ref:"Products"},title:{type:String},price:{type:String}},
      quantity:{type:Number},
      color:{type:String},
    }], 
    isBlocked: { type: Boolean, default: false },
    refreshToken: { type: String },
    passwordChangedAt: { type: String },
    passwordResetToken: { type: String },
    passwordResetExpries: { type: String },
  },
  {
    timestamps: true,
    collection: "Users",
  }
);



userSchema.methods={
   
    createPasswordChangeToken:function(){
        const resetToken= CryptoJS.randomBytes(12).toString('hex')
        this. passwordResetToken=CryptoJS.createHash('sha256').update(resetToken).digest('hex')
        this.passwordResetExpries=Date.now()  + 15 *60 *1000 ;
        return resetToken;
    }
}

const userModel: Model<userDocument> = mongoose.model("user", userSchema);
export default userModel;
