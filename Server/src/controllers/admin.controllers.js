import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/users.models.js";
import { Bike } from "../models/bikes.models.js";

const fetchPendingBikes = asyncHandler(async (req, res) => {

    const bike = await Bike.aggregate([
        {
            $match: { status: "0" }
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

const handleApproveBikes = asyncHandler(async (req, res) => {
    const bikeId  = req.params._id;
    if (!bikeId) {
      throw new ApiError(400, "Bike id is required");
    }
    const bike= await Bike.findByIdAndUpdate(
        bikeId, 
        {status: "1"},
        {new:true});
    if (!bike) {
      throw new ApiError(404, "Bike not found");
    }
  
    return res.status(200)
    .json(new ApiResponse(200, bike, "Bike approved successfully"));
  })

const handleRejectBikes = asyncHandler(async (req, res) => {
    const bikeId  = req.params._id;
    if (!bikeId) {
      throw new ApiError(400, "Bike id is required");
    }
    const bike= await Bike.findByIdAndUpdate(
        bikeId, 
        {status: "2"},
        {new:true});
    if (!bike) {
      throw new ApiError(404, "Bike not found");
    }
  
    return res.status(200)
    .json(new ApiResponse(200, bike, "Bike rejected successfully"));
  })

const listAllUsers = asyncHandler(async (req, res) => {
    const users = await User.find({});
    if (!users) {
      throw new ApiError(404, "Users not found");
    }
  
    return res.status(200)
    .json(new ApiResponse(200, users, "Users fetched successfully"));
  })

const isAdmin = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    const admin=user.isAdmin
    
    return res.status(200)
    .json(new ApiResponse(200, admin, "Admin status fetched successfully"))
})

const countUsersBikes = asyncHandler(async (req, res) => {
  const users= await User.countDocuments({})
  const bikes= await Bike.countDocuments({})
  const approvedBike= await Bike.countDocuments({status:"1"})
  const rejectedBike= await Bike.countDocuments({status:"2"})

  return res.status(200)
  .json(new ApiResponse(200, {users,bikes,approvedBike,rejectedBike }, "Count fetched successfully"))
})  

const makeAdmin = asyncHandler(async (req, res) => {
  const userId  = req.params._id;
  if (!userId) {
    throw new ApiError(400, "User id is required");
  }
  const user= await User.findByIdAndUpdate(
      userId, 
      {isAdmin: true},
      {new:true});
  if(!user){
    throw new ApiError(404, "User not found");
  }

  return res.status(200)
  .json(new ApiResponse(200, user, "successfully made admin"))
})

const deleteUser = asyncHandler(async (req, res) => {
  const userId = req.params._id;
  if (!userId) {
    throw new ApiError(400, "User id is required");
  }
  
  const user = await User.findByIdAndDelete(userId);
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  return res.status(200)
    .json(new ApiResponse(200, null, "User deleted successfully"));
});


  export { fetchPendingBikes,handleApproveBikes,handleRejectBikes,listAllUsers,isAdmin,countUsersBikes,makeAdmin,deleteUser };