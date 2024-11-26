const admin = require("firebase-admin");

const authenticateUser = (req, res, next) => {
  try {
    const idToken = req.headers.authorization;
    admin
      .auth()
      .verifyIdToken(idToken)
      .then((decodedToken) => {
        req.user = decodedToken;
        next();
      })
      .catch((error) => {
        console.log("Error verifying ID token:", error);
        res.status(401).json({ error: "Invalid token" });
      });
  } catch (e) {
    console.log(JSON.stringify(e), "e");
    res.status(401).json({ error: e.message });
  }
};

module.exports = authenticateUser;
