const { userModel } = require("../models/user.model");

async function authenticate(req, res, next) {
  const { sessionId } = req.cookies;
  console.log(req.cookies);
  if (sessionId) {
    const user = await userModel.findOne({ email: sessionId });
    if (!user) {
      return res.status(401).send("Unauthorized");
    }

    req.user = user;
    next();
  } else {
    res.status(401).send("Unauthorized");
  }
}

module.exports = { authenticate };
