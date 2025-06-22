import express from "express"
import handle_current_user, { uploaduserdata } from "../controllers/curuser.controller.js";
import upload from "../middlewares/multer.js";

const curuserroute=express.Router();

curuserroute.route("/").get(handle_current_user)
.post(uploaduserdata).post(upload.single("userassistantfile"),uploaduserdata );
export default curuserroute; 

