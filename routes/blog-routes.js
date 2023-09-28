import express from "express";
import { addBlog, deleteBlog, getAllBlog, getBlogById, getBlogsByUserId, updateBlog } from "../controllers/blog-controller.js";


const blogRouter = express.Router();

blogRouter.get("/", getAllBlog);
blogRouter.post("/addBlog", addBlog);
blogRouter.put("/updateBlog/:id", updateBlog);
blogRouter.get("/:id", getBlogById);
blogRouter.delete("/:id", deleteBlog);
blogRouter.get('/user/:id', getBlogsByUserId);


export default blogRouter;