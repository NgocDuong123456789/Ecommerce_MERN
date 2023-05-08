import mongoose , {Schema, Model}from "mongoose"


export interface userDocument extends mongoose.Document{
    name: string 
    email: string
    password: string
    phone: string
    address: string
    role: number
}
const userSchema:Schema<userDocument> = new mongoose.Schema({
    name:{type:String , required:true, trim:true},
    email:{type:String , required:true, unique: true},
    password:{type:String , required:true },
    phone:{type:String , required:true},
    address:{type:String , required:true},
    role:{type:Number , default :0}
},{
    timestamps: true,
    collection:"Users"
})

const userModel:Model<userDocument>= mongoose.model("user", userSchema)
export default userModel


