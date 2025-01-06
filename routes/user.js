import express from 'express'; 
import { Wrapasync } from '../utils/Wrapasync.js';
import { User } from '../models/user.model.js';
import passport from 'passport';
import { isLogin, saveRedirectUrl } from '../middlewares/loginMiddleware.js';
import { renderLoginForm, renderSignupForm, userLogin, userLogout, userSignup } from '../controllers/user.js';

 
const router = express.Router();

// signup route

router.route("/signup")
    .get(Wrapasync(renderSignupForm))
    .post(Wrapasync(userSignup));


// login route
router.route("/login")
   .get(Wrapasync(renderLoginForm))
   .post(saveRedirectUrl, passport.authenticate('local', {failureRedirect : "/login", failureFlash : true}) ,Wrapasync(userLogin));



router.get("/logout",isLogin, Wrapasync(userLogout));



export {router as userRouter}