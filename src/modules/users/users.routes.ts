import { Router } from "express";
import { userControllers } from "./users.controllers";

const router = Router() ; 

router.get("/" , userControllers.getUsers);
router.get("/:id" , userControllers.getSingleUser) ; 

router.delete("/:id" , userControllers.deleteUser)

export const userRoutes = router ; 