import { Router } from "express";
import { authControllers } from "./auth.controller";


const router = Router()  ;

router.post("/signup" , authControllers.signupUser ) ;

router.post("/signin"  , authControllers.signInUser) ; 

export const authRoutes = router ; 