import mongoose ,{ Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'

const userSchema=new Schema({
    username:{
        type:String,
        required:true,
        unique: true,
        lowercase:true,
        trim:true,
        index:true
    },
    email:{
        type:String,
        required:true,
        unique: true,
        lowercase:true,
        trim:true
    },
    password:{
        type: String,
        required:true,
        required:[true,"Password is required"]
    },
    fullname:{
        type:String,
        required:true,
        trim:true
    },
    refreshToken:{
        type:String
    },  
    phone: {
      type: String,
      required:true,
    },
    
    account: {
       avatar: {
             type:String,
             required:false
        },
        aadhar:{
            type:String,
            required:false,
            default:""
        },
        bikeslisted:{
            type: mongoose.Types.ObjectId,
            ref: "Bike"
          },
        bikerented:{
            type: mongoose.Types.ObjectId,
            ref: "Rent"
          },
      },
    
},{
    timestamps:true
})

userSchema.pre("save",async function(next){
  if(this.isModified("password")){
    this.password=await bcrypt.hash(this.password,10)
    next()
  }
})

userSchema.methods.isPasswordCorrect=async function(password){
  return await bcrypt.compare(password,this.password)
}

userSchema.methods.generateAccessToken=function(){
  return jwt.sign({
    _id:this._id,
    email:this.email,
    username:this.username,
    name:this.name
  },
  process.env.ACCESS_TOKEN_SECRET,{
    expiresIn:process.env.ACCESS_TOKEN_EXPIRY
  })
}

userSchema.methods.generateRefreshToken=function(){
  return jwt.sign({
    _id:this._id,
  },
  process.env.REFRESH_TOKEN_SECRET,{
    expiresIn:process.env.REFRESH_TOKEN_EXPIRY
  })
}

export const User=mongoose.model("User",userSchema)