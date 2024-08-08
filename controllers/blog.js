const blogdb = require("../model/blog");
const commentdb = require("../model/comment");

async function addBlogHandler(req,res){
    console.log(`file name ${req.file}`);
    if(req.file){
        const blog = await blogdb.create({
            content: req.body.body,
            title: req.body.title,
            createdBy: req.user._id,
            coverImageURL: `/uploads/${req.file.filename}`,
        });
    }
    else{
        const blog = await blogdb.create({
            content: req.body.body,
            title: req.body.title,
            createdBy: req.user._id,
        });
    }   
    return res.redirect(`/blog/${blog._id}`);
}

async function findBlogById(req,res){
    const blogData=await blogdb.findById(req.params.id).populate("createdBy");
    const comments=await commentdb.find({blogId:req.params.id}).populate("givenBy");
    comments.sort((a,b)=>new Date(b.updatedAt) - new Date(a.updatedAt));
    // console.log(comments);
    return res.render("blog",{
        user: req.user,
        blog:blogData,
        comments
    });
}

async function addCommentHandler(req,res){
    await commentdb.create({
        content: req.body.content,
        blogId: req.params.id,
        givenBy: req.user._id
    });
    return res.redirect(`/blog/${req.params.id}`);
}
module.exports={
    addBlogHandler,
    findBlogById,
    addCommentHandler
};