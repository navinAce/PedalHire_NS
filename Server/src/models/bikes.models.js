import mongoose ,{ Schema } from 'mongoose';

const bikeSchema=new Schema({
    owner:{
        type:mongoose.Types.ObjectId,
        ref: "User"
    },
    bikeinfo:{
        bikebrand:{
            type:String,
            required:true,
            trim:true
        },
        bikemodel:{
            type:String,
            required:true
        },
        biketype:{
            type:String,
            required:true
        },
        pricePerDay:{
            type:Number,
            required:true
        },
        bikepics:{
            type:[],
            required:true
        }
    }
    
},{
    timestamps:true
})

export const Bike=mongoose.model("Bike",bikeSchema)
