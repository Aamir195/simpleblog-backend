import express from "express";
import mongoose from "mongoose";
import router from "./routes/user-routes.js";
import blogRouter from "./routes/blog-routes.js";

const app = express();

app.use(express.json());

app.use( "/api/user",router);
app.use("/api/blog", blogRouter)

mongoose
    .connect(
        "mongodb+srv://aamirer:Nw6FRdGlqzn6YUje@cluster0.wkcg3yh.mongodb.net/Blog?retryWrites=true&w=majority"
    )
    .then(() => app.listen(5000))
    .then(() => {
        console.log("Coonection done and app is listening at 5000")
    })
    .catch((err) => console.log(err));
    

