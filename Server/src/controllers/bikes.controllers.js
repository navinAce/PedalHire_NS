import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { Bike } from "../models/bikes.models.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const getDetailsFromFrontend= asyncHandler( async (req,res) => {
    const {
        bikenamemodel,
        bikenumber,
        priceperday,
        priceperweek,
        location,
        willingtodeliver,
        availablefromdate,
        availabletodate,
    } = req.body;

    //validation and taking input from frontend
    if ([bikenamemodel,bikenumber,priceperday,priceperweek,location,availablefromdate,availabletodate].some((field) => field?.trim() === "")){
        throw new ApiError(409, "Fields cannot be empty");
    }
    const isWillingToDeliver = willingtodeliver === 'Yes'? true : false;

    const username=req.user.username;

    const nameRegex = /^[a-zA-Z0-9 ]{5,40}$/;      //bikenamemodel val
    if(!nameRegex.test(bikenamemodel)){
        throw new ApiError(409,"Invalid Bike name and model. Please enter a valid bike name with alphabetic characters only and between 5 to 40 characters.")  
    }

    const bikeNumberRegex = /^[A-Z]{2}[0-9]{2}[A-Z]{1,2}[0-9]{4}$/;  //bikenumber val
    if(!bikeNumberRegex.test(bikenumber)){
        throw new ApiError(409,"Invalid bike number")
    }

    let priceRegex = /^\d{1,5}$/;        //price val
    if(!priceRegex.test(priceperday)){
        throw new ApiError(409,"Invalid price")
    }

    priceRegex = /^\d{1,7}$/;        //price val
    if(!priceRegex.test(priceperweek)){
        throw new ApiError(409,"Invalid price")
    }

    let bikePhotoLocalPath1;
    let photo1;
    if (req.files && Array.isArray(req.files.bikephoto) && req.files.bikephoto.length > 0) {
        bikePhotoLocalPath1 = req.files.bikephoto[0].path;
        photo1 = await uploadOnCloudinary(bikePhotoLocalPath1);
    }
    
    let bikePhotoLocalPath2;
    let photo2;
    if (req.files && Array.isArray(req.files.bikephoto) && req.files.bikephoto.length > 1) {
        bikePhotoLocalPath2 = req.files.bikephoto[1].path;
        photo2 = await uploadOnCloudinary(bikePhotoLocalPath2);
    }



    const locationRegex=/^\d{6}$/;        //location val
    if(!locationRegex.test(location)){
        throw new ApiError(409,"Invalid location")
    }

    const availablefromdateRegex=/^\d{4}-\d{2}-\d{2}$/;        //availablefromdate val
    if(!availablefromdateRegex.test(availablefromdate)){
        throw new ApiError(409,"Invalid date")
    }

    const availabletodateRegex=/^\d{4}-\d{2}-\d{2}$/;        //availabletodate val
    if(!availabletodateRegex.test(availabletodate)){
        throw new ApiError(409,"Invalid date")
    }

    const bike= await Bike.create({
        username,
        bikenamemodel,
        bikenumber,
        priceperday,
        priceperweek,
        location,
        availablefromdate,
        availabletodate,
        willingtodeliver:isWillingToDeliver,
        //bikephoto:bikePhotos
        bikephoto:{
            photo1:photo1?.url || null,
            photo2:photo2?.url || null
        }

    })

    if(!bike){
        throw new ApiError(500,"Something went wrong while storing the bike")
    }

    return res.status(201).json(new ApiResponse(200,bike,"Bike details stored successfully"))

    
});

export { getDetailsFromFrontend };