import { getTokenFromHeader } from "../utils/getTokensFromHeader.js"
import { verifyToken } from "../utils/verifyToken.js"

export const isLoggedIn = (req,res, next) => {
    // get token from header
    const token = getTokenFromHeader(req)
    // console.log(token)
    // verify the token
    const decodedUser = verifyToken(token)
    // console.log(decodedUser)
    // save the user into req obj
    if(!decodedUser){
        throw new Error("Token expired/invaild token,please login again")
    }else{
        req.userAuthId = decodedUser?.id
        next()
    }
}