import { Request, Response } from "express";
import { vehiclesServices } from "./vehicles.services";

const getVehicles = async (req : Request , res : Response) => {
    try {
        const result = await vehiclesServices.getVehicles() ;

        return res.status(200).json({
            success : true ,
            message : "Users retrieved successfully" , 
            data: result.rows,
        })
    } catch (error : any) {
    return res.status(500).json({
      success: false,
      message: error.message,
      details: error,
    });
  }
}

const getSingleVehicles = async(req : Request , res : Response) => {
    
}

export const vehiclesControllers = {
    getVehicles , 
}