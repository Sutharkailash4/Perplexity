import { Router } from "express";
import { registerController, loginController, getMeController, logoutController, verifyEmailController } from "../controllers/authentication.controller.js";
import { registerValidator, loginValidator } from "../validator/authentication.validator.js";
import { identifyUser } from "../middleware/auth.middleware.js";

const authRoute = Router();

authRoute.post("/register", registerValidator, registerController);
authRoute.get("/verify-email", verifyEmailController);
authRoute.post("/login", loginValidator, loginController);
authRoute.get("/getMe", identifyUser, getMeController);
authRoute.post("/logout", logoutController);

export default authRoute;