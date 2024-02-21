import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
dotenv.config();
import authRoute  from './routes/authRoute'
import { verifyUser } from "./utils/verifyToken";


const app: Express = express();
const port = process.env.PORT || 8080;

//connection to mongoDB(credentials are in .env file)
//mongoose.set('strictQuery', false);
const connect = async () => {
  try {
      await mongoose.connect(process.env.MONGO_URL || 'undefined');
  } catch (error) {
      throw error
  }
};
connect()

mongoose.connection.on("connected", () => {
  console.log("mongoDB connected!")
})

mongoose.connection.on("disconnected", () => {
  console.log("mongoDB disconnected!")
})


app.use(cors({ origin: ['exp://10.0.0.58:8081', 'http://localhost:8081'], credentials: true }))
app.use(express.json({limit: "5mb"}))
app.use(express.urlencoded({extended: true}))

app.use("/api/auth", authRoute);

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

app.get('/request', verifyUser, (req: Request, res: Response) => {
  res.send("Authorized User");
});


app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});