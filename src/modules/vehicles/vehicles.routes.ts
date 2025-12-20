import { Router } from "express";
import { vehiclesControllers } from "./vehicles.controllers";

const router = Router() ; 

router.get("/" , vehiclesControllers.getVehicles) ; 
// router.post("/" , ) ; 
router.get("/:id" , vehiclesControllers.getSingleVehicle) ; 
router.delete("/:id" , vehiclesControllers.deleteVehicle) ; 

export const vehiclesRouter = router ; 