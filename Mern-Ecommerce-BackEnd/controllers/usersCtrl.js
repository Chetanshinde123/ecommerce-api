import bcrypt from "bcryptjs/dist/bcrypt.js";
import User from "../model/Users.js";
import asyncHandler from "express-async-handler"
import generateToken from "../utils/generateToken.js";
import { ProfilingLevel } from "mongodb";
import { getTokenFromHeader } from "../utils/getTokensFromHeader.js";
import { verifyToken } from "../utils/verifyToken.js";

export const registerUserCtrl = asyncHandler(async (req, res) => {
  // res.json({
  //   msg: "User register controller"
  // });

  const { fullname, email, password } = req.body;

  const userExits = await User.findOne({ email });
  if (userExits) {
    throw new Error("User already exists")
   
  }

  // hash password
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);
  const user = await User.create({
    fullname,
    email,
    password: hashPassword
  });
  res.status(201).json({
    status: "success",
    message: "User Registered Successfully",
    data: user
  });
})

export const loginUserCtrl = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Find user in db by email
  const userFound = await User.findOne({ email }).populate("orders");

// If only data provided data
  if(!email || !password){
    return res.json({
      status: "failed",
      message: "Please provide both email and password",
     
    });
  }

  if (userFound && (await bcrypt.compare(password, userFound?.password))) {
    res.json({
      status: "success",
      message: "Login Success",
      userFound,
      token : generateToken(userFound._id)
    });
  } else {
    throw new Error("Invaild login details")
    
  }
}
)

// @desc    Get user Profile
// @route    GET /api/v1/users/profile 
// @access   Private

export const getUserProfileCtrl = asyncHandler(async(req,res)=>{
  // ----------- Use to know what all data is in header -----------------------
  // console.log(req.headers)

  // get token from header
  // const token = getTokenFromHeader(req)
  // // token is place in authorization varible 
  // console.log(token)

  // // Verify Token
  // const verified = verifyToken(token)
  // // console.log(verified)
  // console.log(req)

  // res.json({
  //   msg : "Welcome to Profile Page"
  // })

  // find user
  const user = await User.findById(req.userAuthId).populate('orders')
  
  res.json({
    status : 'success',
    message : "User profile fetch successfully",
    user
  })
})


// @desc     Update user shipping address
// @route    PUT /api/v1/users/upadate/shipping
// @access   Private

export const updateShippingAddressCtrl = asyncHandler(async(req,res)=>{
  const {firstName,lastName,address,city,postalCode,province,country,phoneNumber} = req.body

  const user = await User.findByIdAndUpdate(req.userAuthId,{
    shippingAddress : {
      firstName,lastName,address,city,postalCode,province,country,phoneNumber
    },
    hasShippingAddress : true
    
  },
  {new : true}
)

res.json({
  status : "success",
  message : " User shipping address updated successfully",
  user
})
})