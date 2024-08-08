const {Router} = require('express');
const multer = require('multer');

const userController = require('../controllers/user');
const router = Router();
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
            cb(null, path.resolve('./public/images'));
    },
    filename: function (req, file, cb) {
        console.log(file);
        const fileName = `${Date.now()}-${file.originalname}`;
        cb(null, fileName);
    },
});

const upload = multer({ storage: storage });
router.route("/login")
.get((req,res)=>{
    return res.render("login");
})
.post(userController.loginHandler);

router.route("/signup")
.get((req,res)=>{
    return res.render("signup");
})
.post(upload.single("profileImage"),userController.userSignup);

router.get("/logout",userController.logoutHandler);

module.exports=router;

