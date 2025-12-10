import { Router } from "express";
import { bookingsControllers } from "./bookings.controllers";

const router = Router();

router.get("/", bookingsControllers.getBookings) ; 
router.post("/" , ) ; 
router.delete("/:id" , bookingsControllers.deleteBookings) ; 
router.put("/:id") ; 


export const bookingRouter = router ;