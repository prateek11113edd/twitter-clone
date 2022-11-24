const jwt = require("jsonwebtoken");

exports.checkAuth = (req, res) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split("Bearer ")[1];

    if (token) {
      try {
        const user = jwt.verify(token, process.env.SECRET_KEY);
        return user;
      } catch (error) {
        return res.json({ status: "error", error: "Invalid/Expired Token" });
      }
    }
    return res.json({
      status: "error",
      error: "Authentication token must be 'Bearer [token]'",
    });
  }
  return res.json({
    status: "error",
    error: "Authorization header must be provided",
  });
};
