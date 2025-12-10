import { Request, Response } from "express";
import { bookingsServices } from "./bookings.services";

const getBookings = async (req: Request, res: Response) => {
  try {
    const result = await bookingsServices.getBookings() ;
    return res.status(200).json({
        success : true, 
        message : "Bookings retrieved successfully" ,
        data : result
    }) ;
  } catch (error: any) {
    return res.status(500).json({
      succes: false,
      message : error.message
    });
  }
};


const getSingleBooking = async(req : Request , res : Response) => {
    try{
        const result = await bookingsServices.getSingleBooking(req.params.id as string ) ; 
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



const deleteBookings = async  (req : Request , res : Response) => {
  try {
    const result = await bookingsServices.deleteBookings(req.params.id as string) ;
    res.status(200).json({
      success : true , 
      message : "Bookings deleted successfully" , 
      data : result.rowCount 
    }) ;
  } catch (error : any) {
     res.status(500).json({
      success : true ,
      message  : error.message
     }); 
  }
}




export const bookingsControllers = {
    getBookings, 
    deleteBookings , 
}