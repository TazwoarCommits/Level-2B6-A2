import { Router } from "express";
import { vehiclesControllers } from "./vehicles.controllers";
import auth from "../../middleware/auth";

const router = Router() ; 

router.get("/" , vehiclesControllers.getVehicles) ; 
router.post("/" , auth("admin") , vehiclesControllers.createVehicle) ; 
router.get("/:id" , vehiclesControllers.getSingleVehicle) ; 
router.delete("/:id" , auth("admin") , vehiclesControllers.deleteVehicle) ; 

export const vehiclesRouter = router ; 