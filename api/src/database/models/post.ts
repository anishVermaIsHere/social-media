import { Schema,SchemaTypes,model } from "mongoose";


const postSchema = new Schema(
    {
        title: { type: String, required: [true, "Please provide post title"] },
        content: { type:String, required: [true, "Please provide post content"] },
        image:{type:String},
        tags: {type:[String]},
        likes: {type: SchemaTypes.ObjectId,ref:'Likes'},
        comments:[{type:SchemaTypes.ObjectId,ref:'Comment'}],
        user:{type:SchemaTypes.ObjectId,ref:'Users'}
    },
    { timestamps: true }
);

const PostModel = model("Posts", postSchema);

export default PostModel;
