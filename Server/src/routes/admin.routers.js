import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { fetchPendingBikes,handleApproveBikes,handleRejectBikes,listAllUsers,isAdmin,countUsersBikes,makeAdmin,deleteUser } from "../controllers/admin.controllers.js"

const adminrouter = Router();

adminrouter.route("/fetch-pending-bikes").get(verifyJWT,fetchPendingBikes)
adminrouter.route("/:_id/approve-bikes").patch(verifyJWT,handleApproveBikes)
adminrouter.route("/:_id/reject-bikes").patch(verifyJWT,handleRejectBikes)
adminrouter.route("/fetch-all-users").get(verifyJWT,listAllUsers)
adminrouter.route("/is-admin").get(verifyJWT,isAdmin)
adminrouter.route("/count-data").get(verifyJWT,countUsersBikes)
adminrouter.route("/:_id/make-admin").patch(verifyJWT,makeAdmin)
adminrouter.route("/:_id/delete-user").delete(verifyJWT,deleteUser)

export { adminrouter };