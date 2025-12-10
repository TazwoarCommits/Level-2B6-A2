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

const getSingleVehicle = async(req : Request , res : Response) => {
    try{
        const result = await vehiclesServices.getSingleVehicle(req.params.id as string) ; 
        if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User Not found",
        data: result.rows[0],
      });
    } else {
      return res.status(200).json({
        success: true,
        message: "User fetched successfully",
      });
    }
    } catch(err : any){
        res.status(500).json({
            success : true , 
            message : err.message
        });
    } ;
} ;

const deleteVehicle = async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await vehiclesServices.deleteVehicle(id as string);
  try {
    if (result.rowCount === 0) {
      res.status(404).json({
        success: false,
        message: "Vehicle Not Found",
      });
    } else {
        res.status(200).json({
        success : true, 
        message : "Vehicle deleted successfully"
        }) ;
    }
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const vehiclesControllers = {
    getVehicles , 
    getSingleVehicle , 
    deleteVehicle
}