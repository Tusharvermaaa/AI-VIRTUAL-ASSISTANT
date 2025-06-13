import jwt from "jsonwebtoken"
async function genToken(userid , email)
{
   const token=await jwt.sign({userid , email} , process.env.user_jwt_sectet , {expiresIn:"30d"});
   return token;
}
export default genToken;