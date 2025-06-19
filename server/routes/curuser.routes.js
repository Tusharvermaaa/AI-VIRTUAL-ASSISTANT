import express from "express"
import handle_current_user from "../controllers/curuser.controller.js";

const curuserroute=express.Router();

curuserroute.route("/").get(handle_current_user);

export default curuserroute;