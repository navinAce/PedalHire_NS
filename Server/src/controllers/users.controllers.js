import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from '../utils/ApiError.js'
import { User } from "../models/users.models.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from 'jsonwebtoken'

const generateAccessAndRefreshTokens=async (userid)=>{
    try {
        const user=await User.findById(userid)
        const accessToken=user.generateAccessToken()
        const refreshToken=user.generateRefreshToken()
        user.refreshToken=refreshToken
        await user.save({validateBeforeSave:false})

        return{
            accessToken,
            refreshToken
        }
    } catch (error) {
        throw new ApiError(500,"Something went wrong while creating Acess and refresh token")
    }

}

const registerUser=asyncHandler( async (req,res)=>{
   
   
    // get user deatial from frontend

    const {username,email,password,fullname,phone}=req.body
   
    // validation

    if([username,email,password,fullname,phone].some((field)=>field?.trim()==="")){
        throw new ApiError(409,"Fields cannot be empty")
    }

    const usernameRegex = /^[a-z0-9_]{3,20}$/;  //username val
    if(!usernameRegex.test(username)) {
        throw new ApiError(409,"username can only contain [a-z,0-9,_], minlength: 3,maxlength: 20")
    }

    if(email.indexOf("@") == -1 || email.indexOf(".") == -1){  //email val
        throw new ApiError(409,"Invalid email. Please enter a valid email address")
    }
                                                   
    const nameRegex = /^[a-zA-Z ]{2,40}$/;      //name val
    if(!nameRegex.test(fullname)){
        throw new ApiError(409,"Invalid name. Please enter a valid name with alphabetic characters only and between 3 to 50 characters.")  
    }

    const phoneRegex=/^\d{10}$/;        //phone val
    if(!phoneRegex.test(phone)){
        throw new ApiError(409,"Invalid Phone number")
    }

    const minLength = 8;                //password val
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    if (!(password.length >= minLength && hasUppercase && hasLowercase && hasNumber)){
        throw new ApiError(409,"Invalid password. Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, and one numeric digit.")
        
    }


    // check if user alerady exist

    const exitingUser=await User.findOne({$or:[{username},{email}]})
    if(exitingUser){
        throw new ApiError(409,"User with email or username already exists")
    }

    // collecting from multer 
    // const avatarLocalPath=req.files?.avatar[0]?.path;
    let avatarLocalPath;
    if (req.files && Array.isArray(req.files.avatar) && req.files.avatar.length > 0) {
        avatarLocalPath = req.files.avatar[0].path
        // console.log(avatarLocalPath);
    }

    // upload them to cloudinary
    const avatar=await uploadOnCloudinary(avatarLocalPath)
    
    
    // create user object - create entrty in db
    const user=await User.create({
        fullname,
        email,
        password,
        username,
        account:{
        avatar:avatar?.url || ""},
        phone
    })

    // remove password and refreshToken from response and check for user creation 
    const createdUser=await User.findById(user._id).select("-password -refreshToken")
    if(!createdUser){
        throw new ApiError(500,"Something went wrong while registering the user")
    }

     // return res
     return res.status(201).json(new ApiResponse(200,createdUser,"User registered successfully"))
    
} )

const loginUser=asyncHandler( async (req,res)=>{
    

    // req from frontend
    const{email,password}=req.body
    console.log(email);
    if(!email){
        throw new ApiError(400,'email is required')
    }

    // email & find the user
    const user= await User.findOne({email})
    if(!user){
        throw new ApiError(404,"user doesn't exist, signup yourself first")
    }

    // password check
    const isPasswordValid=await user.isPasswordCorrect(password)
    if(!isPasswordValid){
        throw new ApiError(404,"Invalid user credentials")
    }

    // access and refresh token
    const {accessToken,refreshToken}=await generateAccessAndRefreshTokens(user._id)

    const loggedInUser=await User.findById(user._id).select("-password -refreshToken")

    // send cookie
    const options={
        httpOnly: true,
        secure: true
    }
    
    return res.status(200)
    .cookie("accessToken",accessToken,options)
    .cookie("refreshToken",refreshToken,options)
    .json(
        new ApiResponse(200
            ,{user:loggedInUser,accessToken,refreshToken}
            ,"user logged in successfully")
    )
})

const logoutUser=asyncHandler( async (req,res)=>{
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $set:{
                refreshToken: undefined
            }
        },{
            new:true
        }
    )

    const options={
        httpOnly: true,
        secure: true
    }

    return res.status(200)
    .clearCookie("accessToken",options)
    .clearCookie("refreshToken",options)
    .json(new ApiResponse(200,{},"User logged out"))

})

const refreshAccessToken=asyncHandler( async (req,res)=>{
    const incomingRefreshToken=req.cookies.refreshToken || req.body.refreshToken
    if(!incomingRefreshToken){
        throw new ApiError(401,"Unauthorized request")
    }

    const decodedToken=jwt.verify(incomingRefreshToken,process.env.REFRESH_TOKEN_SECRET)
 
    const user=await User.findById(decodedToken._id)
    if(!user){
        throw new ApiError(401,"Invalid refresh token")
    }

    if(incomingRefreshToken !== user?.refreshToken){
        throw new ApiError(401,"Refresh token is expired or used")
    }

    const options={
        httpOnly:true,
        secure:true
    }

    const {accessToken,refreshToken}=await generateAccessAndRefreshTokens(user._id)

    return res.status(200)
    .cookie("accessToken",accessToken,options)
    .cookie("refreshToken",refreshToken,options)
    .json(new ApiResponse(200,
        {accessToken,refreshToken},
        "Access Token refreshed successfully"))


})

const changeCurrentPassword=asyncHandler( async (req,res)=>{
    const {oldPassword,newPassword,confirmPassword}=req.body 

    if(!(oldPassword && newPassword && confirmPassword)){
        throw new ApiError(401,"Enter all field")
    }
    if(newPassword === confirmPassword){
        throw new ApiError(400,"Check new and confirm password")
    }
    const user=await User.findById(req.user?._id)
    const isPasswordCorrect=await user.isPasswordCorrect(oldPassword)
    if(!isPasswordCorrect){
        throw new ApiError(400,"Invalid old password")
    }
    user.password=newPassword
    await user.save({validateBeforeSave:false})

    return res.status(200)
    .json(new ApiResponse(200,{},"Password change successfully"))
})

const getCurrentUser = asyncHandler( async(req, res) => {
    return res.status(200)
    .json(new ApiResponse(200,req.user,"User fetched successfully"))
})

const updateUserName= asyncHandler( async (req,res)=>{
    const { fullname }=req.body

    if(!fullname){
        throw new ApiError(400,"Enter new Username")
    }
    const nameRegex = /^[a-zA-Z ]{2,40}$/;      //name val
    if(!nameRegex.test(fullname)){
        throw new ApiError(409,"Invalid name. Please enter a valid name with alphabetic characters only and between 3 to 50 characters.")  
    }

    const user=await User.findByIdAndUpdate(
        req.user?._id,
        {
            $set:{fullname:fullname}
        },{
            new:true
        }
    ).select("-password -refreshToken")
   
    return res.status(200)
    .json(new ApiResponse(200,user,"Fullname  updated successfully"))
})

const updateUserEmail= asyncHandler( async (req,res)=>{
    const { email }=req.body

    if(!email){
        throw new ApiError(400,"Enter new email")
    }
    
    if(email.indexOf("@") == -1 || email.indexOf(".") == -1){  //email val
        throw new ApiError(409,"Invalid new email. Please enter a valid email address")
    }

    const user=await User.findByIdAndUpdate(
        req.user?._id,
        {
            $set:{email:email}
        },{
            new:true
        }
    ).select("-password -refreshToken")
   
    return res.status(200)
    .json(new ApiResponse(200,user,"email  updated successfully"))
})

// const updateUserAvatar = asyncHandler(async(req, res) => {
//     const avatarLocalPath = req.file?.path

//     if (!avatarLocalPath) {
//         throw new ApiError(400, "Avatar file is missing")
//     }

//     //TODO: delete old image - assignment

//     const avatar = await uploadOnCloudinary(avatarLocalPath)

//     if (!avatar.url) {
//         throw new ApiError(400, "Error while uploading on avatar")
        
//     }

//     const user = await User.findByIdAndUpdate(
//         req.user?._id,
//         {
//             $set:{
//                 avatar: avatar.url
//             }
//         },
//         {new: true}
//     ).select("-password")

//     return res
//     .status(200)
//     .json(
//         new ApiResponse(200, user, "Avatar image updated successfully")
//     )
// })

export { registerUser,loginUser,logoutUser,refreshAccessToken,changeCurrentPassword,getCurrentUser,updateUserName,updateUserEmail }