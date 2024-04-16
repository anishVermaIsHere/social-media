import { Schema,SchemaTypes,model } from "mongoose";


const commentSchema=new Schema({
    content:{type:String},
    user:{type:SchemaTypes.ObjectId, ref:'Users'}
});

const CommentModel = model("Comments", commentSchema);

export default CommentModel;

