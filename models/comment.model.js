const { model, Schema } = require("mongoose");

const commentSchema = Schema(
  {
    comment: {
      type: String,
      requied: true,
    },
    creator: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    liked: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    tweet: {
      type: Schema.Types.ObjectId,
      ref: "Tweet",
    },
  },
  { timestamps: true }
);

const Comment = model("Comment", commentSchema);

module.exports = {
  Comment,
};
