import { Request, Response } from "express";
import { usersServices } from "./users.services";
import { JwtPayload } from "jsonwebtoken";

const getUsers = async (req: Request, res: Response) => {
  try {
    const result = await usersServices.getUsers();

    return res.status(200).json({
      success: true,
      message: "Users retrieved successfully",
      data: result.rows,
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: err.message,
      details: err,
    });
  }
};

const getSingleUser = async (req: Request, res: Response) => {
  const id = req.params.id;
  const authUser = req.user as JwtPayload ; 
  console.log(id , authUser.id);

  if(authUser.role === "customer" && String(id) !== String(authUser.id) ){
    return res.status(403).json({
      error : "Forbidden"
    })
  }
  
  try {
    const result = await usersServices.getSingleUser(id as string);

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User Not found",
      });
    } else {
      return res.status(200).json({
        success: true,
        message: "User fetched successfully",
         data: result.rows[0],
      });
    }
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await usersServices.deleteUser(id as string);
  console.log(result.rowCount);
  try {
    if (result.rowCount === 0) {
      res.status(404).json({
        success: false,
        message: "User Not Found",
      });
    } else {
        res.status(200).json({
        success : true, 
        message : "User deleted successfully"
        }) ;
    }
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const userControllers = {
  getUsers,
  getSingleUser,
  deleteUser,
};

