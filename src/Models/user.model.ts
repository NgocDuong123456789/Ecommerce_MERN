import mongoose, { Schema, Model } from "mongoose";
export interface userDocument extends mongoose.Document {
  name: string;
  email: string;
  password: string;
  phone: string;
  role: number;
  cart: cartType[];
  address: string[];
  isBlocked: boolean;
  refreshToken: string;
  passwordChangedAt: string;
  passwordResetToken: string;
  passwordResetExpries: string;
  wishlist: string[];
}

export interface cartType {
  name: { type: String };
  price: { type: Number };
  userId: { type: String };
}

const userSchema: Schema<userDocument> = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    address: [{ type: mongoose.Types.ObjectId, ref: "Address" }],
    wishlist: [{ type: mongoose.Types.ObjectId, ref: "Product" }],// dánh sách yêu thích
    role: { type: Number, default: 0 },
    cart: { type: [Object], default: [] },
    isBlocked: { type: Boolean, default: false },
    refreshToken: { Type: String },
    passwordChangedAt: { type: String },
    passwordResetToken: { Type: String },
    passwordResetExpries: { type: String },
  },
  {
    timestamps: true,
    collection: "Users",
  }
);

userSchema.pre("save",async function(){

})

const userModel: Model<userDocument> = mongoose.model("user", userSchema);
export default userModel;
