import multer from "multer"
const storage=multer.diskStorage({
    destination:( req, file , cb)=>{
        cb(null , "./public")
    } ,
    filename:(req, file , cc)=>{
        cb(null, file.originalname)
    }
})
const upload=multer({storage});
export default upload;