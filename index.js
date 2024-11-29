// configs
require("dotenv").config();
require("./config/firebase");
const serviceAccount = require("./wfms-learning-adminsdk-service-accounts.json");
// imports
const express = require("express");
const admin = require("firebase-admin");
// middlewares
const authenticateUser = require("./middleware/authentication");
// routes
const userRoutes = require("./routes/users");
const projectRoutes = require("./routes/projects");
const taskRoutes = require("./routes/tasks");
const checklistRoutes = require("./routes/checklist");

const PORT = process.env.PORT || 3000;

const app = express();

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

app.use(express.json());

app.use("/users", userRoutes);

app.use(authenticateUser);

app.use("/projects", projectRoutes);
app.use("/tasks", taskRoutes);
app.use("/checklist", checklistRoutes);

app.listen(PORT, () => console.log(`App is listening in PORT ${PORT}`));
