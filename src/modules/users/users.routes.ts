import { Router } from "express";
import { userControllers } from "./users.controllers";
import auth from "../../middleware/auth";

const router = Router() ; 

router.get("/" , auth("admin") ,userControllers.getUsers);
router.get("/:id" , auth("admin" , "customer"), userControllers.getSingleUser) ; 
router.delete("/:id" ,auth("admin") , userControllers.deleteUser) ; 
router.put("/:id" , auth("admin" , "customer") , userControllers.updateUser) ;

export const userRoutes = router ; 