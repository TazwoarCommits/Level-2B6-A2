import { Router } from "express";
import { vehiclesControllers } from "./vehicles.controllers";

const router = Router() ; 

router.get("/" , vehiclesControllers.getVehicles)

export const vehiclesRouter = router ; 