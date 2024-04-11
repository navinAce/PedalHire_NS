import mongoose ,{ Schema } from 'mongoose';

const rentSchema=new Schema({
    renterid:{
        type:String,
    },
    bikeid:{
        type:String,
    },
    pickupDate:{
        type:Date,
        required:true
    },
    dropDate:{
        type:Date,
        required:true
    },
    rentamount:{
        type:String,
        required:true
    },
    rentstatus:{
        type:String,
        default: "0"    // 0: lister ,1 : renter
    },
    renterlocation:{
        type:String,
        required:true
    },
    renttime:{
        type:String
    }
    
},{
    timestamps:true
})

export const Rent=mongoose.model("Rent",rentSchema)