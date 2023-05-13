import mongoose, { Schema, Model } from "mongoose";
import bcrypt from 'bcrypt'
import CryptoJS from 'crypto'

export interface blogDocument extends mongoose.Document {
  title : string,
  description : string
  category: string 
  numberView:number,
  // isLiked:boolean,
  // isDiskLike:boolean
  likes:mongoose.Schema.Types.ObjectId[],
  diskLikes:mongoose.Schema.Types.ObjectId[]
  image: string 
  author: string
}

const blogSchema: Schema<blogDocument> = new mongoose.Schema(
  {
    title : {type: String ,required: true},
    description : {type: String ,required: true}, 
    category:{type: String ,required: true},
    numberView:{type:Number, default:0},
    // isLiked:{type:Boolean, default:false},
    // isDiskLike:{type:Boolean, default:false},
    likes:[{type:mongoose.Schema.Types.ObjectId,ref:"User"}],
    diskLikes:[{type:mongoose.Schema.Types.ObjectId,ref:"User"}],
    image:{type:String, default:"https://www.dungplus.com/wp-content/uploads/2019/12/girl-xinh.jpg"},
    author:{type:String , default:'admin'}
  },
  {
    timestamps: true,
    collection: "Blog",
    // toJSON:{virtuals: true},
    // toObject:{virtuals: true}
  }
);




const blogModel: Model<blogDocument> = mongoose.model("Blog", blogSchema);
export default blogModel;
