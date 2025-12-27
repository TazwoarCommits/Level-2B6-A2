import { Router } from "express";
import { bookingsControllers } from "./bookings.controllers";
import auth from "../../middleware/auth";

const router = Router();

router.get("/", bookingsControllers.getBookings) ; 
router.get("/:id", bookingsControllers.getSingleBooking)
router.post("/" ,auth("admin", "customer"), bookingsControllers.createBooking  ) ; 
router.delete("/:id" , bookingsControllers.deleteBookings) ; 
// router.put("/:id") ; 


export const bookingRouter = router ;