import mongoose from 'mongoose'


const  connectDB= async() =>{
    try{
        await mongoose.connect(process.env.URL);
        console.log("connect successfully")
    }catch(e){
        console.log("connect failed")
    }
  }
  export default connectDB