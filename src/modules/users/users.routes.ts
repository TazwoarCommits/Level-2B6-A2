import { Router } from "express";
import { userControllers } from "./users.controllers";
import auth from "../../middleware/auth";

const router = Router() ; 

router.get("/" , auth("admin") ,userControllers.getUsers);
router.get("/:id" , userControllers.getSingleUser) ; 
router.delete("/:id" , userControllers.deleteUser)

export const userRoutes = router ; 