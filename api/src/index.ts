import express, { Application, Express, Request, Response } from "express";
import { config } from "dotenv";
config();
import bodyParser from "body-parser";
import cors from "cors";
import { dbConnection } from "./config/db/connect.js";
import publicRouter from "./config/routes/public.js";
import { AddressInfo } from "net";
import postRouter from "./config/routes/private/posts.js";
import { cloudinaryConnection } from "./config/cloudinary.js";

const app: Express = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false, limit:'1mb' }));

// cors declaration
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, // access-control-allow-credentials:true
  })
);


app.get("/", (_: Request, res: Response) =>
  res.json({
    message: "Hey, this is a Social Media Server",
    author: "Anish Verma"
  })
);

app.use("/api/v1/user", publicRouter);
app.use('/api/v1/post', postRouter);

const server = app.listen(process.env.SERVER_PORT || 5000, () => {
  const { port } = server.address() as AddressInfo;
  console.log(`***** Social Media Server started at port ${port} *****`);
  dbConnection();
  cloudinaryConnection();
});
