import JWT from 'jsonwebtoken'

export const signJWT = (object:Object,KEY:string ,options:Object) =>{
    return JWT.sign(object, KEY, options)
}

export const verifyJWT = (value: string,KEY:string )=>{
    return JWT.verify(value,KEY)
}



