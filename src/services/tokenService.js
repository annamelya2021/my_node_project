import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import {TokensModel} from "../models/tockenModel.js";
dotenv.config();

const { SECRET_TOKEN_KEY } = process.env;

export const generateTokens = async (payload) => {
    const Token = jwt.sign(payload, SECRET_TOKEN_KEY, { expiresIn: "30d" });
    return Token;
    
  };

  export const saveTokens = async (userId, newToken) => {
    const tokenData = await TokensModel.findOne({ user: userId });
    if (tokenData) {
      tokenData.token = newToken;
      return tokenData.save();
    }
    const token = TokensModel.create({ user: userId, token:newToken });
    return token;
  };

  export const removeToken = async (token) => {
    const tokenData = await TokensModel.deleteOne({ token });
    console.log('token :>> ', token);
    console.log('tokenData :>> ', tokenData);
    return tokenData;
  };