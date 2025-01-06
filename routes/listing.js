
import express from 'express';
import { Wrapasync } from '../utils/Wrapasync.js';
import { isLogin, isOwner } from '../middlewares/loginMiddleware.js';
import { validateListing } from '../middlewares/loginMiddleware.js';
import {renderNewForm, createListing, destroyListing, renderEditForm, index, showListing, updateListing} from '../controllers/listings.js'
import multer from 'multer'
import { storage } from '../config.js';

const router = express.Router();

const upload = multer({storage})





// new route

router.get("/new", isLogin, renderNewForm );


// create route
router.route("/")
    .get(Wrapasync(index))
    .post(isLogin, validateListing, upload.single("listing[image]"), Wrapasync(createListing));

router.route("/:id")
    .put(isLogin, isOwner, validateListing , upload.single("listing[image]") ,Wrapasync(updateListing))
    .get(isLogin ,Wrapasync(showListing))
    .delete(isLogin, isOwner, Wrapasync(destroyListing));


// edit route
router.get("/:id/edit", isLogin, isOwner, Wrapasync(renderEditForm));



export {router};