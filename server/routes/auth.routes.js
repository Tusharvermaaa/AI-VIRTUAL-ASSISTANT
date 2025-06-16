import express from "express";
import {
  signup_auth,
  login_auth,
  logout_auth,
} from "../controllers/auth.controller.js";
const auth_router = express.Router();

// here get request means showing the frontend part , postreq means authentication using controller
auth_router
  .route("/signup")
  .post(signup_auth) // signup handle
  .get((req, res) =>
    res.send({ message: "hi from user routes for sign up ejs functinaity " })
  );

auth_router.route("/signin").post(login_auth);

auth_router.route("/logout").get(logout_auth);

export default auth_router;
