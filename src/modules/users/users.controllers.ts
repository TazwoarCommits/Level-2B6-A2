import { request, Request, Response } from "express";
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
      error : "Forbidden" , 
      message : "You are only authorized to see your information"
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
      success : false , 
      message : error.message ,
      error : error
    });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await usersServices.deleteUser(id as string);
  try {
    if(result?.status === "forbidden" ){
      return res.status(403).json({
        success : false , 
        message : "User has active bookings, can not be deleted"
      }) ; 
    }
    
    if(result?.status === "not_found" ){
      return res.status(404).json({
        success : false , 
        message : "User does not exist" 
      }) ; 
    }
    if(result?.status === "success" ){
      return res.status(200).json({
        success : false , 
        message : "User deleted successfully"
      }) ; 
    }

  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
      error : error
    });
  }
};

const updateUser = async (req : Request , res : Response) => {
  try {
    const result = await usersServices.updateUser(req) ;
    if(result?.status === "forbidden"){
      return res.status(403).json({
        success : false , 
        message  : "You can only update your own info"
      });
    }
    if(result?.status === "unauthorized"){
      return res.status(401).json({
        success : false , 
        message  : "users can not update their role"
      });
    }
    if(result?.status === "not_found"){
      return res.status(404).json({
        success : false , 
        message  : "User Not found"
      });
    }
    if(result?.status === "success"){
      return res.status(200).json({
        success : false , 
        message  : "User updated successfully", 
        data : result.result 
      });
    }
  } catch (error : any) {
    return res.status(500).json({
      success : false , 
      message : error.message ,
      error : error
    }) ;
  }
}

export const userControllers = {
  getUsers,
  getSingleUser,
  deleteUser,
  updateUser
};

