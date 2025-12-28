import { Request, Response } from "express";
import { bookingsServices } from "./bookings.services";

const createBooking = async (req : Request , res : Response) => {
  try {
    const result = await bookingsServices.createBooking(req as Request) ;
    if(result?.status === "bad_request"){
      return res.status(404).json({
           success : false,
           message : "You can only book for your account's id" ,
      });
    }

    if(result?.status === "not_found"){
      return res.status(404).json({
           success : false,
           message : "vehicle not found" ,
      });
    }

    if(result?.status === "booked"){
       return res.status(400).json({
         success : false,
         message : "Vehicle is already booked"
       }) ;
    } ;

    res.status(201).json({
       success : true , 
       message : "Booking done successfully" , 
       data : result

    }) ;
  } catch (error : any) {
   res.status(500).json({
    success : false , 
    message : error.message , 
    error : error 
   })
  }
}

const getBookings = async (req: Request, res: Response) => {
  try {
    const result = await bookingsServices.getBookings(req) ;
    return res.status(200).json({
        success : true, 
        message : "Bookings retrieved successfully" ,
        data : result
    }) ;
  } catch (error: any) {
    return res.status(500).json({
      succes: false,
      message : error.message,
      error : error
    });
  }
};


const updateBooking = async (req : Request , res : Response) => {
   try {
     const result = await bookingsServices.updateBooking(req) ; 
     if (result?.status === "bad_request" ){
      return res.status(400).json({
        success : false , 
        message : "You are only authorized to cancel the booking"
      })
     } ; 
     if (result?.status === "forbidden" ){
      return res.status(403).json({
        success : false , 
        message : "Booking can not be cancelled"
      })
     } ; 
     if (result?.status === "unauthorized" ){
      return res.status(401).json({
        success : false , 
        message : "Only yours booking can be cancelled"
      })
     } ; 

     if (result?.status === "cancelled" ){
      return res.status(200).json({
        success : true , 
        message : "Booking cancelled successfully" , 
        data : result.result
      })
     } ; 



  

   } catch (error : any) {
      return res.status(500).json({
      succes: false,
      message : error.message, 
      error : error
    });
   }
}


// const getSingleBooking = async(req : Request , res : Response) => {
//     try{
//         const result = await bookingsServices.getSingleBooking(req.params.id as string ) ; 
//         if (result.rows.length === 0) {
//       return res.status(404).json({
//         success: false,
//         message: "User Not found",
//         data: result.rows[0],
//       });
//     } else {
//       return res.status(200).json({
//         success: true,
//         message: "User fetched successfully",
//       });
//     }
//     } catch(err : any){
//         res.status(500).json({
//             success : true , 
//             message : err.message
//         });
//     } ;
// } ;



// const deleteBookings = async  (req : Request , res : Response) => {
//   try {
//     const result = await bookingsServices.deleteBookings(req.params.id as string) ;
//     if (result.rowCount === 0 ) {
//       res.status(404).json({
//         success : false, 
//         message : "Booking Not Found" ,
//       }) ; 
//     } else {
//       res.status(200).json({
//         success : true , 
//         message : "Booking Deleted Successfully"
//       }) ;
//     } 
//   } catch (error : any) {
//      res.status(500).json({
//       success : true ,
//       message  : error.message
//      }); 
//   }
// }




export const bookingsControllers = {
    createBooking,
    getBookings, 
    updateBooking
    // deleteBookings ,
    // getSingleBooking 
}