import { Schema, SchemaTypes, model } from "mongoose";

const commentSchema = new Schema(
  {
    content: { type: String },
    user: { type: SchemaTypes.ObjectId, ref: "Users" },
    post: { type: SchemaTypes.ObjectId, ref: "Posts" },
    edited: { type: SchemaTypes.Boolean, default: false },
  },
  { timestamps: true }
);

const CommentModel = model("Comments", commentSchema);

export default CommentModel;
