import { Router } from "express";
import { vehiclesControllers } from "./vehicles.controllers";
import auth from "../../middleware/auth";

const router = Router() ; 

router.get("/" , vehiclesControllers.getVehicles) ; 
router.get("/:id" , vehiclesControllers.getSingleVehicle) ; 
router.post("/" , auth("admin") , vehiclesControllers.createVehicle) ; 
router.delete("/:id" , auth("admin") , vehiclesControllers.deleteVehicle) ; 
router.put("/:id" , auth("admin") , vehiclesControllers.updateVehicle) ; 

export const vehiclesRouter = router ; 