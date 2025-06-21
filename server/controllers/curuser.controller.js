
import uploadoncloudinary from "../config/cloudinary.js";
import userModel from "../models/user.model.js";
const handle_current_user= async (req, res)=>{

    try{
        const userid=req.userid;
        const actualuser=await userModel.findById(userid).select("-password");
        if(!actualuser) return res.status(400).json({"status":" user does not exists "});
        // return res.status(200).json({id:req.userid  , email:req.useremail});
        // console.log(actualuser , " is actualuser ");
        return res.status(200).json(actualuser);
    } catch (error) {
         console.log("something wrong happened in curuser.controller.js , error message is  " , error)
    }

}
export const uploaduserdata= async(req, res)=>{
    const {selectedname , selectedimg} = req.body;
    try {
    
        let assistantimage ;
        if(req.fileimg)
        {
           assistantimage=await uploadoncloudinary(req.fileimg);
        }
        else assistantimage=selectedimg;
        const myuser=await userModel.findByIdAndUpdate(req.userid,{assistantname:selectedname , assistantimage:assistantimage} , {new:true}).select("-password");
        return res.send(myuser);
        
    } catch (error) {
                 console.log("curuser.controller.js -> updating user object error :::-" , error)

    }


}

export default handle_current_user