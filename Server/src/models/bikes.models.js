import mongoose ,{ Schema } from 'mongoose';

const bikeSchema=new Schema({
    listerid:{
        type:String,
        required:true,
    },
    bikenamemodel:{
        type:String,
        required:true,
        trim:true
    },
    bikenumber:{
        type:String,
        required:true
    },
    priceperday:{
        type:String,
        required:true
    },
    priceperweek:{
        type:String,
        required:true
    },
    bikephoto:{
        type:String,
        required:true
    },
    yourlocation:{
        type:String,
        required:true,
    },
    willingtodeliver:{
        type: Boolean,
        default: false  
    },
    availablefromdate: {
        type: Date,
        required: true,
        default: Date.now
    },
    availabletodate: {
        type: Date,
        required: true
    }
}
,{
    timestamps:true
})

export const Bike=mongoose.model("Bike",bikeSchema)
