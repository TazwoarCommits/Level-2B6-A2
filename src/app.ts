import express, { Request, Response } from "express";
import { initDB } from "./config/db";
import { userRoutes } from "./modules/users/users.routes";
import { vehiclesRouter } from "./modules/vehicles/vehicles.routes";
import { bookingRouter } from "./modules/bookings/bookings.routes";
import { authRoutes } from "./modules/auth/auth.routes";

const app = express();
app.use(express.json());


// DB Initialized
initDB() ; 

// authRoutes

app.use("/api/v1/auth", authRoutes ) ;

// userRoutes

app.use("/api/v1/users", userRoutes ) ; 

// vehicleRoutes

app.use("/api/v1/vehicles" , vehiclesRouter) ; 

// bookingRoutes

app.use("/api/v1/bookings", bookingRouter) ;


app.use((req , res) => {
    res.status(404).json({
        success : false,
        message : "Not Found",
        path : req.path
    }) ; 
}) ;

app.get("/", (req: Request, res: Response) => {
  res.send("Hell Yeah!");
});

app.post("/", (req: Request, res: Response) => {
  console.log(req.body);
  res.status(200).json({
    message: "All Okay",
  });
});


export default app ; 