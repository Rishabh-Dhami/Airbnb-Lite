import express from 'express';
import path, {dirname} from 'path';
import { fileURLToPath } from 'url';
import ejsMate from 'ejs-mate';
import { Errorhandler } from './utils/Errorhandler.js';
import methodOverride from 'method-override';
import { router as listingRouter } from './routes/listing.js';
import { routerReview } from './routes/reviews.js';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import flash from 'connect-flash';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { User } from './models/user.model.js';
import { userRouter } from './routes/user.js';
import { connectDB, app } from './database/db.js';
import { mongoUrl, sessionSecret } from './config.js';




connectDB();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const store = MongoStore.create({
    mongoUrl : mongoUrl,
    crypto : {
        secret : sessionSecret,
    },
    touchAfter : 24 * 3600
})

store.on("error", (err) => {
    console.log("ERROR IN  MONGO SESSION STORE!", err);
})

const sessionOption = {
    store,
    secret : sessionSecret,
    resave : false,
    saveUninitialized : true,
    cookie : {
        
        expires : Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge : 7 * 24 * 60 * 60 * 1000,
     },
}

app.use(session(sessionOption));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));



app.use(methodOverride('_method')); // Middleware setup

app.engine('ejs', ejsMate);
app.set("views", path.join(__dirname,"views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended : true}));



passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use((req, res, next) => {
    res.locals.errorMssg = req.flash("error");
    res.locals.successMssg = req.flash("success");
    res.locals.currUser = req.user;
    
    
    next();
});







// routing

app.use('/listings', listingRouter);
app.use("/listings/:id/reviews", routerReview);
app.use("/", userRouter);




app.all("*", (req, res , next) => {
    next(new Errorhandler(401, "page not found"));
})

app.use((err, req, res, next) => {
    const { statusCode = 500, message = 'Internal Server Error' } = err;
    res.render("listings/error.ejs",{ err});
    // res.status(statusCode).send("error.ejs",{message});
    
})







// async function show() {
//     let result = await Listing.findById("67387689e3401e6fd0807674");
//     console.log(result);
    
// }


// show()