const { model, Schema } = require("mongoose");

const tweetSchema = Schema(
  {
    image: {
      type: String,
    },
    message: {
      type: String,
      required: true,
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
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
  },
  { timestamps: true }
);

const Tweet = model("Tweet", tweetSchema);

module.exports = {
  Tweet,
};
