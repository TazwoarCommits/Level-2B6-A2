import { Router } from "express";
import { bookingsControllers } from "./bookings.controllers";
import auth from "../../middleware/auth";

const router = Router();

router.get("/",auth("admin" , "customer") , bookingsControllers.getBookings) ; 

router.post("/" ,auth("admin", "customer"), bookingsControllers.createBooking  ) ; 

router.put("/:id" , auth("admin" , "customer") , bookingsControllers.updateBooking) ; 

// router.get("/:id", bookingsControllers.getSingleBooking)
// router.delete("/:id" , bookingsControllers.deleteBookings) ; 
export const bookingRouter = router ;