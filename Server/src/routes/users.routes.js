import { Router } from "express";
import {
  checkUserStatus,
  loginUser,
  logoutUser,
  refreshAccessToken,
  registerUser,
  verifyUser,
  changeCurrentPassword,
  getCurrentUser,
  updateUserName,
  updateUserAddress,
  updateUserAvatar,
  fetchBikeDetails,
  rentData,
} from "../controllers/users.controllers.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { getDetailsFromFrontend,fetchApprovedBikes,fetchBikeDetailsForCheckOut,updateisbooked } from "../controllers/bikes.controllers.js";
import { getFeedbacks } from "../controllers/feedback.controllers.js";


const router = Router();

router.route("/register").post(
  // upload.fields([
  //     {
  //         name: "avatar",
  //         maxCount: 1
  //     }]),
  registerUser
);

router.route("/login").post(loginUser);
router.route("/checkstatus").get(verifyJWT, checkUserStatus);
router.route("/bikedetails").post(
  verifyJWT,
  upload.fields([
    {
      name: "bikephoto",
      maxCount: 2,
    },
  ]),
  getDetailsFromFrontend
);
router.route("/verify-document").post(
  verifyJWT,
  upload.fields([{
    name:"avatar",
    maxCount: 1
  },
    {
      name: "license",
      maxCount: 1,
    },
    {
      name: "rcbook",
      maxCount: 1,
    },
  ]),
  verifyUser
);

router.route("/update-username").post(verifyJWT, updateUserName);
router.route("/update-address").post(verifyJWT, updateUserAddress);
router.route("/update-avatar").post(verifyJWT,
  upload.fields([
  {
    name: "avatar",
    maxCount: 1,
  },
]),updateUserAvatar)
router.route("/fetch-bike-details").get(verifyJWT,fetchBikeDetails)

//searchBikeRoute
router.route("/search-bike").get(fetchApprovedBikes)
router.route("/rent-data").get(verifyJWT,rentData)

//feedback route
router.route("/feedback").post(verifyJWT,getFeedbacks)

//secured routes
router.route("/logout").post(verifyJWT, logoutUser);
router.route("/change-password").post(verifyJWT, changeCurrentPassword);
router.route("/refresh-token").post(refreshAccessToken);
router.route("/fetchUserData").get(verifyJWT,getCurrentUser)
router.route("/fetch-bike-details/:bikeId").get(verifyJWT,fetchBikeDetailsForCheckOut)
router.route("/:bikeId/:pickupDate/:dropDate/:totalCost/:location/updateisbooked").post(verifyJWT,updateisbooked)

export { router };
