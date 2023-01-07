var jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    const token = authorization.split(" ")[1];
    const decoded = await jwt.verify(token, process.env.Token_Secret);
    if (decoded) {
      req.username = decoded.username;
      req.userId = decoded.userId;
      next();
    } else {
      res.status(403).json({ message: "forbidden accesse asfsfd" });
    }
  } catch (err) {
    console.log(err, "from verifytoken");
    res.status(403).json({ message: "forbidden accesse" });
  }
};

module.exports = verifyToken;
