const { Router } = require("express");

const router = Router();

router.use("/auth", require("../routes/auth/auth.routes"));
router.use("/tweet", require("../routes/tweet/tweet.routes"));
router.use("/comment", require("../routes/comment/comment.routes"));

module.exports = router;
