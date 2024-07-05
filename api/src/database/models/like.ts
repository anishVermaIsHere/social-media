import { Schema, SchemaTypes, model } from "mongoose";

const likeSchema = new Schema(
  {
    post: { type: SchemaTypes.ObjectId, ref: "Posts" },
    user: [{ type: SchemaTypes.ObjectId, ref: "Users" }],
  },
  {
    timestamps: true,
  }
);

const LikeModel = model("Likes", likeSchema);

export default LikeModel;
