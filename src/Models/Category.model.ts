import mongoose, { Schema, Model } from "mongoose";
import bcrypt from 'bcrypt'
import CryptoJS from 'crypto'
export interface CategoryDocument extends mongoose.Document {
  title : string

}



const categorySchema: Schema<CategoryDocument> = new mongoose.Schema(
  {
    title : {type: String ,required: true, unique: true, index: true}
  },
  {
    timestamps: true,
    collection: "Category",
  }
);

// userSchema.pre("save",async function(){
//     const user= this as userDocument;
    
// })

categorySchema.methods={
    // isCorrectPassword:async function(password: string ){
    //     return await bcrypt.compare(password , this.password)
    // }
   

    createPasswordChangeToken:function(){
        const resetToken= CryptoJS.randomBytes(12).toString('hex')
        this. passwordResetToken=CryptoJS.createHash('sha256').update(resetToken).digest('hex')
        this.passwordResetExpries=Date.now()  + 15 *60 *1000 ;
        return resetToken;
    }
}

const userModel: Model<CategoryDocument> = mongoose.model("Category", categorySchema);
export default userModel;
