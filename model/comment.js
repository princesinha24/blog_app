const { Schema, model }=require('mongoose');

const commentSchema = Schema({
    content: {
        type: String,
        required: true,
    },
    blogId: {
        type: Schema.Types.ObjectId,
        ref: "blog",
    },
    givenBy: {
        type: Schema.Types.ObjectId,
        ref: "user",
    },
},
{ timestamps: true }
);

const comment = model("comment",commentSchema);

module.exports = comment;