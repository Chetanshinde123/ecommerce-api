import { getTokenFromHeader } from "../utils/getTokensFromHeader.js"
import { verifyToken } from "../utils/verifyToken.js"

export const isLoggedIn = (req,res, next) => {
    // get token from header
    const token = getTokenFromHeader(req)
    // verify the token
    const decodedUser = verifyToken(token)
    // save the user into req obj
    if(!decodedUser){
        throw new Error("Token expired/invaild token,please login again")
    }else{
        req.userAuthId = decodedUser?.id
        next()
    }
}