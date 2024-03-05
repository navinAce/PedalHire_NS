import mongoose ,{ Schema } from 'mongoose';

const bikeSchema=new Schema({
    username:{
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
//     bikephoto:{
//         type:[String],
//         required:true
// },
bikephoto:{
    photo1:{
        type:String,
        required:true
    },photo2:{
        type:String,
        required:true
    }
},
    location:{
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
    },

}
,{
    timestamps:true
})

export const Bike=mongoose.model("Bike",bikeSchema)
