import { Request, Response } from "express";
import userModel from "../Models/user.model";
import { comparePassword, hashPassword } from "../helper/hashPassword";
import { signJWT } from "../helper/JWT";
import JWT from "jsonwebtoken";

let ArrayRefreshToken: string[] = [];
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
        phone
        
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
      const { email, password } = req.body;
      if (!email || !password)
        return res.status(403).send({ email: "Invalid email or password" });
      const user = await userModel.findOne({ email });
      if (!user) return res.status(422).send({ email: "Email không đúng" });
      const matchPassword = await comparePassword(password, user.password);
      if (!matchPassword)
        return res.status(422).send({ password: "mật khẩu không đúng" });
      // create accessToken
      const accessToken = signJWT(
        { _id: user._id },
        process.env.JWT_ACCESS_TOKEN,
        { expiresIn: "1m" }
      );
      const refreshToken = signJWT(
        { _id: user._id },
        process.env.JWT_REFRESH_TOKEN,
        { expiresIn: "30d" }
      );
      ArrayRefreshToken.push(refreshToken);

      res.cookie("refresh_token", refreshToken, {
        httpOnly: true,
        sameSite: "strict",
        path: "/",
      });

      return res.status(200).json({
        message: "login successfully",

        data: {
          user: {
            name: user.name,
            email: user.email,
            address: user.address,
            phone: user.phone,
          },
          access_token: accessToken,
          refresh_token: refreshToken,
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
    ArrayRefreshToken = ArrayRefreshToken.filter(
      (refresh_token) => refresh_token !== refresh_token
    );

    JWT.verify(
      refresh_token,
      process.env.JWT_REFRESH_TOKEN,
      (error: JWT.VerifyErrors, user: JWT.JwtPayload) => {
        if (error) {
          return res.status(401).json({ message: "" });
        }
        const newAccess_Token = signJWT(
          { _id: user._id },
          process.env.JWT_ACCESS_TOKEN,
          { expiresIn: "30d" }
        );
        const newRefresh_token = signJWT(
          { _id: user._id },
          process.env.JWT_REFRESH_TOKEN,
          { expiresIn: "30d" }
        );

        res.cookie("refresh_token", newRefresh_token, {
          httpOnly: true,
          path: "/",
          secure: true,
          sameSite: true,
        });
        ArrayRefreshToken.push(refresh_token);

        return res.status(200).json({
          access_token: newAccess_Token,
          refresh_token: newRefresh_token,
        });
      }
    );
  },

  logout: async (req: Request, res: Response) => {
    res.clearCookie("refresh_token", {
      httpOnly: true,
      path: "/",
      secure: true,
      sameSite: "strict",
    });
    ArrayRefreshToken = ArrayRefreshToken.filter(
      (refresh_token) => refresh_token !== refresh_token
    );
    res.status(200).send({ message: "logout successfully" });
  },

  test: async (req: Request, res: Response) => {
    return res.send("protected routes");
  },
};
