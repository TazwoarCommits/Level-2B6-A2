import express, { Request, Response } from "express";
import config from "./config";
import { initDB } from "./config/db";
import { userRoutes } from "./modules/users/users.routes";
import { vehiclesRouter } from "./modules/vehicles/vehicles.routes";
import { bookingRouter } from "./modules/bookings/bookings.routes";
import { authRoutes } from "./modules/auth/auth.routes";

const app = express();
app.use(express.json());

const port = config.port;

// DB Initialized
initDB() ; 

app.use("/api/v1/auth", authRoutes ) ;

app.use("/api/v1/users", userRoutes ) ; 

app.use("/api/v1/vehicles" , vehiclesRouter) ; 

app.use("/api/v1/bookings", bookingRouter) ;

app.get("/", (req: Request, res: Response) => {
  res.send("Hell Yeah!");
});

app.post("/", (req: Request, res: Response) => {
  console.log(req.body);
  res.status(200).json({
    message: "All Okay",
  });
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
