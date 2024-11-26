const admin = require("firebase-admin");
const {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} = require("firebase/auth");
const queries = require("../queries");
const pool = require("../config/db");

const auth = getAuth();

const getAllUsers = (req, res) => {
  admin
    .auth()
    .listUsers(10)
    .then((listUsersResult) => {
      res.status(200).json({
        users: listUsersResult,
      });
    })
    .catch((error) => {
      console.log("Error listing users:", error);
      res.status(500).json({ error: error.errorInfo.message });
    });
};

const createUser = (req, res) => {
  const { name, email, password, phoneNumber, roleId } = req.body;
  try {
    admin
      .auth()
      .createUser({
        email,
        password,
        phoneNumber,
      })
      .then((userRecord) => {
        pool
          .query(queries.createUser, [
            userRecord.uid,
            name,
            email,
            phoneNumber,
            roleId,
          ])
          .then(() => {
            res.status(201).json({
              msg: `Successfully created new user - ${name}`,
              uid: userRecord.uid,
            });
          })
          .catch((e) => {
            res.status(500).json({
              error: e?.message,
              note: "User created in firebase but not in DB",
            });
          });
      })
      .catch((error) => {
        console.log("Error creating new user:", error);
        res.status(500).json({ error: error?.errorInfo?.message });
      });
  } catch (error) {
    console.log("Error creating new user:", error);
    res.status(500).json({ error: error?.message });
  }
};

const login = (req, res) => {
  const { email, password } = req.body;
  signInWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
      pool
        .query(queries.getUserDetails, [userCredential.user.uid])
        .then(async (queryRes) => {
          await admin.auth().setCustomUserClaims(userCredential.user.uid, {
            role_id: queryRes.rows[0]?.role_id,
            user_name: queryRes.rows[0]?.name,
          });
          const idToken = await userCredential.user.getIdToken(true);
          res.status(200).json({
            uid: userCredential.user.uid,
            authToken: idToken,
            refreshToken: userCredential._tokenResponse.refreshToken,
          });
        })
        .catch((error) => {
          console.log("Error getting user details:", error);
          res.status(500).json({ error: error?.message });
        });
    })
    .catch((error) => {
      console.log("Error authenticating user:", error);
      res.status(401).json({ error: "Invalid credentials" });
    });
};

const logout = (req, res) => {
  // signOut(auth)
  //   .then(() => {
  //     res.status(200).json({ message: "User logged out successfully" });
  //   })
  //   .catch((error) => {
  //     console.error(error);
  //     res.status(500).json({ error: "Internal Server Error" });
  //   });
};

module.exports = { createUser, getAllUsers, login, logout };
