import { asyncHandler } from "../utils/asyncHandler.js";
import { Feedback } from "../models/feedback.models.js";
import { ApiResponse } from "../utils/ApiResponse.js";


const getFeedbacks = asyncHandler(async (req, res) => {
  const { name, email, comments } = req.body;
  if(!req.user._id){
    return res.status(401)
    .json(new ApiResponse(401,null,"Unauthorized"));
  }
  await Feedback.findOneAndUpdate(
    { userId: req.user._id },
    { $set: { name, email }, 
      $push: { comments: { text: comments } } },
    {
      upsert: true,
      new: true,
    }
  );
  return res.status(200)
  .json(new ApiResponse(200,null,"Feedback added successfully"))
});

export { getFeedbacks };
