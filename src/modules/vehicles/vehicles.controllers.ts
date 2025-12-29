import { Request, Response } from "express";
import { vehiclesServices } from "./vehicles.services";

const createVehicle = async (req: Request, res: Response) => {
  try {
    const result = await vehiclesServices.createVehicle(req);
    return res.status(201).json({
      success: true,
      message: "Vehicle created successfully",
      data: result.rows[0],
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
};

const getVehicles = async (req: Request, res: Response) => {
  try {
    const result = await vehiclesServices.getVehicles();

    return res.status(200).json({
      success: true,
      message: "Vehicle retrieved successfully",
      data: result.rows,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
      details: error,
    });
  }
};

const getSingleVehicle = async (req: Request, res: Response) => {
  try {
    const result = await vehiclesServices.getSingleVehicle(
      req.params.id as string
    );
    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Vehicle Not found",
      });
    } else {
      return res.status(200).json({
        success: true,
        message: "User fetched successfully",
        data: result.rows[0],
      });
    }
  } catch (err: any) {
    res.status(500).json({
      success: true,
      message: err.message,
    });
  }
};

const updateVehicle = async (req : Request , res : Response) => {
  try {
    const result = await vehiclesServices.updateVehicle(req) ; 
    if(result?.status === "not_found"){
      return res.status(404).json({
        success : false , 
        message : "Vehicle not found"
      }) ;
    }

    if (result?.status === "success"){
      return res.status(200).json({
        success : true ,
        message : "Vehicle updated successfully" ,
        data : result.result 
      }) ;
    }
  } catch (error : any) {
    return res.status(500).json({
      success : false ,
      message : error.message,
      details : error
    });
  }
}

const deleteVehicle = async (req: Request, res: Response) => {
  const id = req.params.id;
  const user = req.user;
  console.log("from controller", { user });

  const result = await vehiclesServices.deleteVehicle(id as string);  
  try {
    if (result.status === "BOOKED") {
      res.status(400).json({
        success: false,
        message: "Vehicle is booked , Try when vehicle is available",
      });
    }

    if (result.status === "NOT_FOUND") {
      res.status(404).json({
        success: false,
        message: "Vehicle Not Found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Vehicle deleted successfully",
    }); 
    
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const vehiclesControllers = {
  createVehicle,
  getVehicles,
  getSingleVehicle,
  updateVehicle ,
  deleteVehicle,
};
