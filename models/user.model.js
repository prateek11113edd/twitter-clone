const { model, Schema } = require("mongoose");

const userSchema = Schema(
  {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
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
