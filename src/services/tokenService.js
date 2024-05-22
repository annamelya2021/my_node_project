import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const { SECRET_TOKEN_KEY } = process.env;

export const generateTokens = async (payload) => {
    const Token = jwt.sign(payload, SECRET_TOKEN_KEY, { expiresIn: "30d" });
    return Token;
    
  };

