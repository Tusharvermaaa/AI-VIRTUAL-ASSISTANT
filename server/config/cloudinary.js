import {v2 as cloudinary} from "cloudinary"
import fs from "fs"
const uploadoncloudinary=async (FILEPATH)=>{
     cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
        api_key: process.env.CLOUDINARY_API_KEY, 
        api_secret: process.env.CLOUDINARY_API_SECRET
        // Click 'View API Keys' above to copy your API secret
    });
    try {
        const uploadResult = await cloudinary.uploader.upload(FILEPATH);
         fs.unlinkSync(FILEPATH);
         return uploadResult.secure_url;
    } catch (error) {
        fs.unlinkSync(FILEPATH);
        console.log("error in cloudinary " , error);
    }
}
export default uploadoncloudinary;