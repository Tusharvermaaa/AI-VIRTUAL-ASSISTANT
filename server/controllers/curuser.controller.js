
import userModel from "../models/user.model.js";
const handle_current_user= async (req, res)=>{

    try{
        const userid=req.userid;
        const actualuser=await userModel.findById(userid).select("-password");
        if(!actualuser) return res.status(400).json({"status":" user does not exists "});
        // return res.status(200).json({id:req.userid  , email:req.useremail});
        console.log(actualuser , " is actualuser ");
        return res.status(200).json(actualuser);
    } catch (error) {
         console.log("something wrong happened in curuser.controller.js , error message is  " , error)
    }

}
export default handle_current_user