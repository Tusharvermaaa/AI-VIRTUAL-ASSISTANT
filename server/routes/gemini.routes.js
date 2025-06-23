import express from "express";
import geminicontroller from "../controllers/gemini.controller.js";

const geminirouter=express.Router();

geminirouter.route("/")
.post(geminicontroller);

export default geminirouter