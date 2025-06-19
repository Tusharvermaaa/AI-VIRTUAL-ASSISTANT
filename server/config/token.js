import jwt from "jsonwebtoken"
export function genToken(userid )
{
   const token= jwt.sign({userid} , process.env.user_jwt_secret , {expiresIn:"90d"});
   return token;
}
// export default {genToken};