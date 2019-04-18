import express from "express";
import userController from "../controllers/user";

const router = express.Router();

// user sign up route
router.post("/user/signup", userController.createUser);

module.exports = router;
