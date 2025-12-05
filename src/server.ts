import express, { Request, Response } from "express";
import { Pool } from 'pg'

const app = express();
app.use(express.json());

const port = 5000;

const pool = new Pool({
    connectionString : `postgresql://neondb_owner:npg_0AKtsZpPoE1U@ep-morning-sun-a8jcfv0m-pooler.eastus2.azure.neon.tech/neondb?sslmode=require&channel_binding=require`
})

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
