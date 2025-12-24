import { Request, Response } from "express";
import { authServices } from "./auth.services";

const signupUser = async (req: Request, res: Response) => {
  try {
    const result = await authServices.signUpUser(req);
    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data : result.rows[0] 
    });
  } catch (error : any) {
    res.status(500).json({
        success : false , 
        message : error.message , 
        details : error
    })
  }
};

export const authControllers = {
  signupUser,
};
