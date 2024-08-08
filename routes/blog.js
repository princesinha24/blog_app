const { Router } = require("express");
const { addBlogHandler, findBlogById, addCommentHandler } = require("../controllers/blog");
const multer = require('multer');
const path = require('path');
const router = Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
    cb(null, path.resolve('./public/uploads'));
    },
    filename: function (req, file, cb) {
    const fileName = `${Date.now()}-${file.originalname}`;
    cb(null, fileName);
    },
});

const upload = multer({ storage: storage });
router.route("/add-new")
.get((req, res) => {
    return res.render("addBlog", {
      user: req.user,
    });
})
.post(upload.single("coverImage"),addBlogHandler);

router.get("/:id", findBlogById);

router.post("/comment/:id",addCommentHandler);


module.exports=router;