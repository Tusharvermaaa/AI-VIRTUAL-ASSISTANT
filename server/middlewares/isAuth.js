import jwt from "jsonwebtoken"
const isAuth= (req, res, next)=>{
    try {
        const token=req.cookies.token;
        // console.log(req.cookies," here are cookies vaieable ")
        // console.log(typeof token , token )
        if(!token) return res.status(400).json({"status":" token not foundi in isauth"});
        const verifytoken= jwt.verify(token , process.env.user_jwt_secret);
        // console.log(verifytoken )
         req.userid=verifytoken.userid;  // 
         next()
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({"msg":" eroor"})
    }

}
export default isAuth;