import { NextFunction, Request, Response } from "express";
import  jwt from "jsonwebtoken";
import config from "../config";

const auth = () => {
  return (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({
         message: "You are not authorized" });
    }
    
    const token = authHeader.split(" ")[1] ; 
//  console.log({withBearer : authHeader , token : token});

    // const decoded = jwt.verify(token as string , config.jwt_secret as string)
    // console.log(decoded);
    // next();
  };
};

export default auth;
