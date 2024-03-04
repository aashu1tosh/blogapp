const mongoose = require('mongoose');
const Blog = require('../model/Blog')

const fetchListOfBlogs = async (req, res) => {
    let blogList;
    try {
        blogList = await Blog.find();
    } catch (e) {
        console.log(e);
    }

    if (!blogList) {
        return res.staus(404).json(
            {
                "message": "No blogs found",
            }
        )
    }
    if (blogList) {
        return res.status(200).json({ blogList });
    }
};

const addNewBlog = async (req, res) => {
    const {title, description} = req.body;
    const currentDate = new Date();
    const newlyCreateBlog = new Blog({
        title, description, date : currentDate
    })

    try {
        await newlyCreateBlog.save();
    } catch(e) {
        console.log(e);
    }

    try {
        const session = await mongoose.startSession();
        session.startTransaction();
        await newlyCreateBlog.save(session);
        session.commitTransaction();
    } catch {
        return res.send(500).json({message: e});
    }

    return res.status(200).json({newlyCreateBlog});

};

const deleteABlog = async(req,res) => {
    const id = req.params.id;

    try {
        const findCurrentBlog = await Blog.findByIdAndDelete(id);
        if(!find) {
            return res.status(404).json({message : "blog not found"});
        }
        return res.status(200).json({message: "Successfully Deleted"});
    } catch (e) {
        return res.status(500).json({message: `Unable to delete due to ${e}`})
    }
};

const updateABlog = async (req,res) => {
    const id = req.params.id;

    const {title, description} = req.body;
    let currentBlogToUpdate;

    try {
        currentBlogToUpdate = await Blog.findByIdAndUpdate(id, {
            title, description
        })
    } catch (e) {
        console.log(e);
        return res.send(500).json({
            message: "Something went wrong while updating Please try again",
        });
    }

    if(!currentBlogToUpdate) {
        return res.starus(500).json({
            message: "Unable to Update",
        });
    }

    return res.send(200).json({currentBlogToUpdate});
}

module.exports = {
    fetchListOfBlogs,
    deleteABlog,
    updateABlog,
    addNewBlog
};
