const { Schema, model } = require("mongoose");
const { generateHash256 } = require("../middleware/auth");


const user = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        profileImageURL: {
            type: String,
            default: "/images/default.png",
        },
        role: {
            type: String,
            enum: ["USER", "ADMIN"],
            default: "USER",
        },
    },
    { timestamps: true }
);

user.pre("save", function (next) {
    const users = this;
    console.log(users);
    if (!users.isModified("password")) return;
  
    const hashedPassword = generateHash256(users.password);
    this.password = hashedPassword;
  
    next();
  });

const userdb = model("user",user);

module.exports =userdb;