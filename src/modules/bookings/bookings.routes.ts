import { Router } from "express";
import { bookingsControllers } from "./bookings.controllers";

const router = Router();

router.get("/", bookingsControllers.getBookings)


export const bookingRouter = router ;