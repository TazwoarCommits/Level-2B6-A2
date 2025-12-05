import express, { Request, Response } from "express";

const app = express();
app.use(express.json());

const port = 5000;

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
