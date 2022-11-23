const { model, Schema } = require("mongoose");

const userSchema = Schema(
  {
    name: {
      type: String,
      required: true,
    },
    emai: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    tweetsCreated: [
      {
        type: Schema.Types.ObjectId,
        ref: "Tweet",
      },
    ],
    tweetsLiked: [
      {
        type: Schema.Types.ObjectId,
        ref: "Tweet",
      },
    ],
    commentsCreated: [
      {
        type: Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
  },
  { timestamps: true }
);

const User = model("User", userSchema);

module.exports = {
  User,
};
