import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";

const auth = (...roles : string []) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader) {
        return res.status(401).json({
          message: "You are not authorized",
        });
      }

      const token = authHeader.split(" ")[1];
      //  console.log({withBearer : authHeader , token : token});

      const decoded = jwt.verify(token as string, config.jwt_secret as string) as JwtPayload;
      console.log(decoded);

      req.user = decoded as JwtPayload;
      console.log("loggedIn User",req.user);

      if(roles.length && !roles.includes(decoded.role)){
        return res.status(401).json({
          error : "Unauthorized!!!"
        })
      }

      next();

    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };
};

export default auth;
