import { Router } from "express";
import {
  loginUser,
  logoutUser,
  refreshAccessToken,
  registerUser,
} from "../controllers/users.controllers.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { getDetailsFromFrontend } from "../controllers/bikes.controllers.js";

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

router
  .route("/bikedetails")
  .post(
    verifyJWT,
    // upload.array("bikephoto", 2),
    upload.fields([
      {
        name: "bikephoto",
        maxCount: 2,
      },
    ]),
    getDetailsFromFrontend
  );

//secured routes
router.route("/logout").post(verifyJWT, logoutUser);
router.route("/refresh-token").post(refreshAccessToken);

export { router };
