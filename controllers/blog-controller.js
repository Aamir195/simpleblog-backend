import mongoose, { mongo } from "mongoose";
import Blog from "../model/Blog.js";
import User from "../model/User.js";


export const getAllBlog = async (req, res, next) => {
    let blogs;

    try {
        blogs = await Blog.find();
    } catch (err) {
        console.log(err)
    }
    if (!blogs) {
        return res.status(404).json({ message: "No Blog Founds" })
    }
    return res.status(200).json({ blogs })
}

export const addBlog = async (req, res, next) => {
    const { title, description, image, user } = req.body;

    let existingUser;
    try {
        existingUser = await User.findById(user);

    } catch (err) {
        return console.log(err)
    }

    if (!existingUser) {
        return res.status(400).json({ message: "Unauthorised User" })
    }

    const blog = new Blog({
        title, description, image, user,
    });
    try {
        // as Blog and user connected so we have to update the User tabel as well when any new blog is created

        // starting the session functianality 
        const session = await mongoose.startSession();
        session.startTransaction();
        await blog.save({ session });

        // push the new blog into the user table also 
        existingUser.blogs.push(blog);
        await existingUser.save({ session });

        // ending session 
        session.commitTransaction();



    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: err })


    }
    return res.status(200).json({ blog })
}


export const updateBlog = async (req, res, next) => {
    const { title, description } = req.body;
    let blogId = req.params.id;

    let blog;
    try {
        blog = await Blog.findByIdAndUpdate(blogId, {
            title,
            description,
        });
    } catch (err) {
        return console.log(err);
    }
    if (!blog) {
        return res.status(500).json({ message: "Unable to update the blog" });
    }
    return res.status(200).json({ blog });

}

export const getBlogById = async (req, res, next) => {
    let blogId = req.params.id;
    let blog;

    try {
        blog = await Blog.findById(blogId);

    } catch (err) {
        return console.log(err)
    }
    if (!blog) {
        return res.status(400).json({ message: "No Blog Found !" })
    }
    return res.status(200).json({ blog })
}


export const deleteBlog = async (req, res, next) => {
    let blogId = req.params.id;
    let blog;

    try {

        blog = await Blog.findByIdAndDelete(blogId).populate('user');
        await blog.user.blogs.pull(blog);
        await blog.user.save();

    } catch (err) {
        return console.log(err)
    }
    if (!blog) {
        return res.status(500).json({ message: "Unable to delete the blog" });
    }
    return res.status(200).json({ message: "Blog deleted successfully" });
}


export const getBlogsByUserId = async (req, res, next) => {
    let userid = req.params.id;

    let userBlogs;
    try {
        userBlogs = await User.findById(userid).populate("blogs");

    } catch (err) {
        return console.log(err)
    }
    if (!userBlogs) {
        return res.status(404).json({ message: "No blog Found for this user" })
    }
    return res.status(200).json({ blogs: userBlogs })

}
