const express = require('express');
const mongoose =require('mongoose');
const path = require('path');
const cookiePaser = require("cookie-parser");

const userRoute = require("./routes/user");
const { authenticationCookie } = require('./middleware/auth');
const blogRouter = require('./routes/blog');
const blogdb = require('./model/blog');


const PortNo = 8006;
const app= express();

mongoose.connect('mongodb://127.0.0.1:27017/blog')
.then((res)=>{
    console.log("connect to moongoDB");
})
.catch((err)=>{
    console.log(`error encounterd ${err}`);
});

app.set("view engine", "ejs");
app.set("views", path.resolve("./view"));

app.use(express.urlencoded({ extended: false }));

app.use(cookiePaser());
app.use(authenticationCookie("uuid"));

app.use(express.static(path.resolve("./public")));

app.get("/",async (req,res)=>{
    const allBlogs = await blogdb.find({});
    console.log(allBlogs);
    res.render("home",{
        user:req.user,
        blogs:allBlogs
    });
});
app.use("/user",userRoute);
app.use("/blog",blogRouter);

app.listen(PortNo,()=>{
    console.log(`Port is listening at ${PortNo}`);
});