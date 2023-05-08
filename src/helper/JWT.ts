import JWT from 'jsonwebtoken'

export const signJWT = (object:Object,KEY:string ,options:Object) =>{
    return JWT.sign(object, KEY, options)
}



