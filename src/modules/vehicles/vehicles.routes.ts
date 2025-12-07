import { Router } from "express";
import { vehiclesControllers } from "./vehicles.controllers";

const router = Router() ; 

router.get("/" , vehiclesControllers.getVehicles) ; 
router.get("/:id" , vehiclesControllers.getSingleVehicles) ; 

export const vehiclesRouter = router ; 