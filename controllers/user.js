const { generateHash256, generateToken } = require("../middleware/auth");
const userdb = require("../model/user");

async function loginHandler(req,res){
    const email=req.body.email;
    const pwd = req.body.password;
    try{
        const user = await userdb.findOne({ email });
        if (!user) throw new Error("User not found!");

        const hashedUserPwd=generateHash256(pwd);
        if(user.password === hashedUserPwd){
            token=generateToken(user);
            return res.cookie("uuid",token).redirect("/");
        }
        else{
            throw new Error("email or password is incorrect");
        }
        res.render('login');
    }
    catch(error){
        console.log(error);
    }
    res.render("login")
}

async function signupHandler(req,res,role){
    console.log(req.file);
    const email=req.body.email;
    const pwd=req.body.password;
    const name=req.body.fullName;
    if(req.file){
        await userdb.create({
            email:email,
            name:name,
            password:pwd,
            profileImageURL: `/images/${req.file.filename}`
        });
    }
    else{
        await userdb.create({
            email:email,
            name:name,
            password:pwd
        });
    }
    return res.redirect("login");
}

async function userSignup(req,res){
    console.log(req.file);
    signupHandler(req,res,"User");
}

function logoutHandler(req,res){
    res.clearCookie("uuid").redirect("login");
}
module.exports ={
    loginHandler,
    userSignup,
    logoutHandler
};