import dotenv  from "dotenv"
import express from "express";
import mongoose from "mongoose";
import router from "./routes/user-routes.js";
import blogRouter from "./routes/blog-routes.js";

dotenv.config()

const app = express();

app.use(express.json());

app.use( "/api/user",router);
app.use("/api/blog", blogRouter)

mongoose
    .connect(
        process.env.URI
    )
    .then(() => app.listen(5000))
    .then(() => {
        console.log("Coonection done and app is listening at 5000")
    })
    .catch((err) => console.log(err));
    

