import bcrypt from "bcrypt"

export const hashPassword=async(password: string)=>{
    try{
        const salt = await bcrypt.genSalt(10);
        const hash=  bcrypt.hash(password,salt);
        return hash;
    }
    catch(err){
        console.log(err)
    }
}

export const comparePassword=async(password:string, hashPassword: string)=>{

    try{
        return await bcrypt.compare(password, hashPassword)
    }
    catch(err){
        console.log(err)
    }
}