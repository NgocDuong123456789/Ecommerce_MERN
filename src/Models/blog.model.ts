import mongoose, { Schema, Model } from "mongoose";
import bcrypt from 'bcrypt'
import CryptoJS from 'crypto'
export interface blogDocument extends mongoose.Document {
  title : string

}



const blogSchema: Schema<blogDocument> = new mongoose.Schema(
  {
    title : {type: String ,required: true, unique: true, index: true}
  },
  {
    timestamps: true,
    collection: "Blog",
  }
);

// userSchema.pre("save",async function(){
//     const user= this as userDocument;
    
// })

blogSchema.methods={
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

const blogModel: Model<blogDocument> = mongoose.model("Blog", blogSchema);
export default blogModel;
