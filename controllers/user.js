
import { User } from "../models/user.model.js";



export const renderSignupForm = async(req, res, next) => {
    res.render("user/signup.ejs");
}

export const userSignup = async(req, res, next) => {
    try {
        let {username, password, email} = req.body;
        let newUser = new User({email, username});
        let userRegister = await User.register(newUser, password);
        console.log(userRegister);

        req.login(userRegister, (err) => {
            if(err){
                return next(err);
            }
            req.flash("success", "welcome to airbnb!");
        res.redirect("/listings/new")
        })
        
        
    } catch (error) {
        req.flash("error", "this account is already register");
        res.redirect("/signup");
    }
 }


 export const userLogout = async(req, res, next) => {
    req.logout((err)  => {
        if(err){
            next(err);
        }
        req.flash("success", "logged out you!!")
        res.redirect("/listings");
    })
 }


 export const userLogin = async(req, res, next) => {
    req.flash("success", "login  successfully;")
    let redirectUrl = res.locals.redirectUrl || "/listings"
    res.redirect(redirectUrl);
 }

 export const renderLoginForm = async(req, res, next) => {
    res.render("user/login.ejs")
 }