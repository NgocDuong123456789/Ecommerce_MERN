import { Request, Response, NextFunction } from "express";
import userModel from "../Models/user.model";
import { comparePassword, hashPassword } from "../helper/hashPassword";
import { signJWT } from "../helper/JWT";
import JWT from "jsonwebtoken";
import CryptoJS from 'crypto'
import sendMail from '../helper/saveMail'
interface AuthenticatedRequest extends Request {
  user?: any;
}

export const authController = {
  register: async (req: Request, res: Response) => {
    try {
      const { name, email, password, phone } = req.body;
      // validations
      if (!name) return res.status(422).send({ name: "name is Required" });
      if (!email) return res.status(422).send({ email: "email is Required" });
      if (!password)
        return res.status(422).send({ password: "password is Required" });
      if (!phone) return res.status(422).send({ phone: "phone is Required" });
      // if (!address)
      //   return res.status(422).send({ address: "address is Required" });
      // existing user ;

      const exisitingUser = await userModel.findOne({ email });
      if (exisitingUser)
        return res.status(422).send({ email: "email đã tồn tại" });
      const hash = await hashPassword(password);
      // save
      const user = await new userModel({
        name,
        email,
        password: hash,
        phone,
      }).save();
      return res.status(200).send({
        message: "User Register Successfully",
        data: {
          user: user,
        },
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error in Registeration",
        error,
      });
    }
  },
  login: async (req: Request, res: Response) => {
    try {
      const { email } = req.body;
      if (!email || !req.body.password)
        return res.status(403).send({ email: "Invalid email or password" });
      const user = await userModel.findOne({ email });
      if (!user) return res.status(422).send({ email: "Email không đúng" });
      const matchPassword = await comparePassword(
        req.body.password,
        user.password
      );
      if (!matchPassword)
        return res.status(422).send({ password: "mật khẩu không đúng" });
      // create accessToken
      const accessToken = signJWT(
        { _id : user._id , role:user.role},
        process.env.JWT_ACCESS_TOKEN,
        { expiresIn: "1m" }
      );

      const refresh_token = signJWT(
        { _id: user._id },
        process.env.JWT_REFRESH_TOKEN,
        { expiresIn: "30d" }
      );

      // lưu refresh token vào database
      await userModel.findByIdAndUpdate(
        user._id,
        { refresh_token},
        { new: true }
      ); // mặc định là false nếu không để thì nó sẽ trả về data trc khi update , để là true thì trả về data sau khi update
      res.cookie("refresh_token", refresh_token, {
        httpOnly: true,
        sameSite: "strict",
        path: "/",
      });
      const { password, role,refreshToken, ...userData } = user.toObject()
      return res.status(200).json({
        message: "login successfully",

        data: {
          userData,
          access_token: accessToken,
        },
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error in Login",
        error: error,
      });
    }
  },

  refreshToken: async (req: Request, res: Response) => {
    const refresh_token = req.cookies.refresh_token;
    if (!refresh_token)
      return res.status(401).json({ message: "you are not authorized" });
    JWT.verify(
      refresh_token,
      process.env.JWT_REFRESH_TOKEN,
      async (error: JWT.VerifyErrors, user: JWT.JwtPayload) => {
        if (error) {
          return res.status(401).json({ message: "" });
        }
        const response = await userModel.findOne({
          _id: user._id,
          refreshToken: refresh_token,
        });
        const newAccess_Token = signJWT(
          { _id: response._id },
          process.env.JWT_ACCESS_TOKEN,
          { expiresIn: "30d" }
        );

        const newRefresh_token = signJWT(
          { _id: response._id },
          process.env.JWT_REFRESH_TOKEN,
          { expiresIn: "30d" }
        );
        res.cookie("refresh_token", newRefresh_token, {
          httpOnly: true,
          path: "/",
          secure: true,
          // sameSite: true,
        });
        return res.status(200).json({
          access_token: newAccess_Token,
          refresh_token: newRefresh_token,
        });
      }
    );
  },

  logout: async (req: Request, res: Response) => {
    const cookie = req.cookies;
    if (!cookie || !cookie.refresh_token)
      return res.status(400).json("no refres token in cookies");
    await userModel.findOneAndUpdate(
      { refreshToken: cookie.refresh_token },
      { refreshToken: "" },
      { new: true }
    );

    res.clearCookie("refresh_token", {
      httpOnly: true,
      path: "/",
      secure: true,
      // sameSite: "strict",
    });
    res.status(200).send({ message: "logout successfully" });
  },

  // change passwork hoặc reset

  // client giửi email
  // server check email có hợp lệ k => giửi email + kèm theo link (password change token)
  // client check mail -> click link
  // client giửi api kèm theo token
  // check token có giống với token mà server giửi mail hay không
  // nếu giống thì change

  forgotPassword: async (req: Request, res: Response) => {
    const { email } = req.query;
    if (!email) return res.json("Messing email");
    const user = await userModel.findOne({ email });
    if (!user) return res.status(403).json({ email: "email not found" });
    const resetToken = user.createPasswordChangeToken();
    await user.save();
    //  gửi mail
    // đoạn text muốn giửi
    const html = `Xin vui lòng click vào link dưới đây để  thay đổi mật khẩu của bạn.Link này sẽ hết hạn sau 15 phút kể từ bây giờ <a href=${process.env.URL_SERVER}/api/user/reset-password/${resetToken}>toang</a>`;
    const data={
      email: email as string ,
      html
    }
    const rs =await sendMail(data)
    return res.status(200).json({
      success: true,
      rs
    })
  },

  resetPassword: async(req: Request, res: Response) => {
    const {token, password}= req.body
    if(!password || !token) return res.status(403).json("không có password và token")
    const passwordResetToken= CryptoJS.createHash('sha256').update(token).digest('hex')
    const user= await userModel.findOne({passwordResetToken: passwordResetToken, passwordResetExpries:{$gt:Date.now()}})
    if(!user) return res.status(402).json("invalid reset token")
    const hash = await hashPassword(password);
    user.password=hash
    user.passwordChangedAt=String(Date.now())
    user.passwordResetToken= undefined;
    user.passwordResetExpries= undefined;
    await user.save();
    return res.status(200).json({
      success: true,
      message:"user update password successfully "
    })
  },

  test: async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const user = await userModel
        .findById(req.user._id)
        .select("-password -refreshToken -role");
      return res.status(200).json(user);
    } catch (err) {
      console.log(err);
    }
  },
  getAllUser:async(req: Request, res: Response) => {
    const response= await  userModel.find({}).select("-password -role -refreshToken")
    return res.status(200).json({
      success:response ? true :false ,
      user: response
    })
  },
  deleteUser:async(req: Request, res: Response) => {
    const {_id}= req.params
    if(! _id) return res.json('Missing inputs')
    const response= await  userModel.findByIdAndDelete(_id)
    return res.status(200).json({
      success:response ? true :false ,
      message:'delete user successfully'

    })

  },

  updateUser: async (req: AuthenticatedRequest, res: Response) => {
    const {_id}= req.user
    if(!_id || Object.keys(req.body).length ===0 ) return res.json("Missing input")
    const response = await userModel.findByIdAndUpdate(_id,req.body,{new: true}).select('-refreshToken -role -password')
    return res.status(200).json({
      success:true, message:"update successfully user",
      user:response
    })
  },

  updateByAdmin:async(req: Request, res: Response)=>{
    const {_id}= req.params
    if(!_id || Object.keys(req.body).length ===0 ) return res.json("Missing input")
    const response = await userModel.findByIdAndUpdate(_id,req.body,{new: true}).select('-refreshToken -role -password')
    return res.status(200).json({
      success:true, message:"update successfully user",
      user:response
    })
  }

  



};
