const {Schema, model} = require('mongoose');

const blog= new Schema({
    title:{
        type: String,
        require: true
    },
    content:{
        type: String,
        require: true
    },
    coverImageURL: {
        type: String,
        required: false,
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "user",
    },
},
{timestamps: true}
);

const blogdb=model("blog",blog);

module.exports=blogdb;