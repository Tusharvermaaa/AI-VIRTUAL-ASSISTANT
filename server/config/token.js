import jwt from "jsonwebtoken"
export async function genToken(userid , email)
{
   const token=await jwt.sign({userid , email} , process.env.user_jwt_secret , {expiresIn:"30d"});
   return token;
}
// export default {genToken};