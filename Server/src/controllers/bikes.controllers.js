import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { Bike } from "../models/bikes.models.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/users.models.js";
import { Rent } from "../models/rents.models.js";

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
    if ([bikenamemodel,bikenumber,priceperday,priceperweek,location].some((field) => field?.trim() === "")){
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

const fetchApprovedBikes = asyncHandler(async (req, res) => {

    const bike = await Bike.aggregate([
        {
            $match: { status: "1",isbooked:false,availabletodate:{$gte:new Date()} }
        },
      {
        $lookup: {
          from: "users",
          localField: "username",
          foreignField: "username",
          as: "userDetails",
        },
      },
      {
          $project:{
            "userDetails.username":1,
            "userDetails.fullname":1,
            "userDetails.phone":1,
            "userDetails.address":1,
            "userDetails.account":1,
            "userDetails.createdAt":1,
              bikenamemodel:1,
              bikenumber:1,
              priceperday:1,
              priceperweek:1,
              bikephoto:1,
              location:1,
              willingtodeliver:1,
              availablefromdate:1,
              availabletodate:1,
              createdAt:1,
              status:1,
          }
      }
    ]);
    if(!bike){
      throw new ApiError(404, "error while fetching bike details");
    }
  
    return res.status(200)
    .json(new ApiResponse(200, bike, "Bike details fetched successfully"));
  });

const fetchBikeDetailsForCheckOut = asyncHandler(async (req, res) => {
    const bikeId = req.params.bikeId;
    const bike = await Bike.findOne({ _id: bikeId });
    if (!bike) {
      throw new ApiError(404, "Bike not found");
    }
    return res.status(200)
    .json(new ApiResponse(200, bike, "Bike details fetched successfully"));
})

const updateisbooked = asyncHandler(async (req, res) => {
    const bikeId = req.params.bikeId;
    const pickupDate = req.params.pickupDate;
    const dropDate = req.params.dropDate;
    const totalCost = req.params.totalCost;
    const location = req.params.location;
    const bike = await Bike.findOne({ _id: bikeId });
    if (!bike) {
      throw new ApiError(404, "Bike not found");
    }
    bike.isbooked = true;
    await bike.save({ validateBeforeSave: false });
    const user = await User.findOne({ _id: req.user._id });
    if (!user) {
      throw new ApiError(404, "User not found");
    }
    let status
    if(user.username === bike.username){
        status="1";
    }

    const rent=await Rent.create({
        renterid:user._id,
        bikeid:bike._id,
        pickupDate:pickupDate,
        dropDate:dropDate,
        rentamount:totalCost,
        rentstatus:status,
        renterlocation:location,
    })
    if(!rent){
        throw new ApiError(500,"Something went wrong while storing the rent")
    }
    return res.status(200)
    .json(new ApiResponse(200, rent, "Bike details updated successfully"));
})

export { getDetailsFromFrontend,fetchApprovedBikes,fetchBikeDetailsForCheckOut,updateisbooked };