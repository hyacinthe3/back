import { createBlog,getAllBlog,getBlogById,deleteBlogById,updateBlogById} from "../controllers/blogController.js";
import express from "express";
import upload2 from "../middlewares/upload.js"

const blogRouter=express.Router();

blogRouter.post('/createBlog',upload2.single('image'),createBlog);
blogRouter.get("/getAllBlog",getAllBlog);
blogRouter.get("/getBlogById/:id",getBlogById);
blogRouter.delete("/deleteBlogById/:id",deleteBlogById);
blogRouter.put("/updateBlogById/:id",updateBlogById);

export default blogRouter;