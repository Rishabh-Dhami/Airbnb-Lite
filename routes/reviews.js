import express from 'express';
import { Wrapasync } from '../utils/Wrapasync.js';
import { isLogin, isReviewAuthor, reviewvalidte } from '../middlewares/loginMiddleware.js';
import { createReview, destroyReview } from '../controllers/review.js';

const route = express.Router({ mergeParams: true });





route.post("/", isLogin, reviewvalidte, Wrapasync(createReview))

// delete review router

route.delete("/:reviewid", isLogin, isReviewAuthor, Wrapasync(destroyReview))

export {route as routerReview}