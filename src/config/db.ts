import mongoose from 'mongoose'


const  connectDB= async() =>{
    try{
      const res=   await mongoose.connect(process.env.URL);
        if(res.connection.readyState===1){
            console.log("connect successfully")
        }else  console.log("DB connect is failed")

    }catch(e){
        console.log("connect failed")
    }
  }
  export default connectDB