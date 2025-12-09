import { Router } from "express";
import { bookingsControllers } from "./bookings.controllers";

const router = Router();

router.get("/", bookingsControllers.getBookings) ; 
router.delete("/:id") ; 
router.put("/:id") ; 


export const bookingRouter = router ;