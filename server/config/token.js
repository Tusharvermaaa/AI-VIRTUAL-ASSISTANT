import jwt from "jsonwebtoken"
async function genToken(userid , email)
{
    jwt.sign({userid , email} , process.env.user_jwt_sectet)
}