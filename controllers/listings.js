import { Listing } from "../models/listing.model.js";

// index route
export const index =  async (req, res) => {
    let lists = await Listing.find({});
    res.render("listings/index.ejs", { lists });  // Flash message should be available here
}

// new router

export const renderNewForm = (req, res) => {
    res.render("listings/new.ejs");
}

// create 

export const createListing = async (req, res, next) => {
    if (!req.body.listing) {
        throw new Errorhandler(401, "send valid data listing`");
    }

    let url = req.file.path;
    let filename = req.file.filename;

    let data = new Listing({...req.body.listing});
    data.image = {url, filename};
    data.owner = req.user._id;
    await data.save();
    req.flash("success", "New listing created successfully!");
    res.redirect("/listings")  // Redirect to listings page
}

// update listing

export const updateListing = async(req, res, next) => {
    let {id} = req.params;
    
    let listing =  await Listing.findByIdAndUpdate(id, {...req.body.listing} ,{new: true, // Return the updated document
    runValidators: true});
    
   if(typeof req.file !== "undefined"){
    let url = req.file.path;
    let filename = req.file.filename;

    listing.image = {url, filename};
    await listing.save();
   }
    
    req.flash("success", "listing edited successfully!");
    res.redirect("/listings");
    
}

// show listings

export const showListing = async(req, res) => {
    let {id} = req.params;
    const list = await Listing.findById(id)
    .populate({path : 'reviews', populate : {
        path : "author"
    }})
    .populate("owner");
    
    if(!list){
        req.flash("error" , "listing you requiested that does not exist");
        res.redirect("/listings");
    }
   
    
    
    res.render("listings/show.ejs", {list})
}

// edit listing


export const renderEditForm = async(req, res) => {
    let {id} = req.params;
    let data = await Listing.findById(id);
    if(!data){
        req.flash("error", "which list u request for edit is already delelted");
        res.redirect("/listings")
    }

    let originalurl = data.image.url;
    originalurl = originalurl.replace("/upload", "/upload/e_blur:200/h_300");

    console.log(originalurl);
    
    res.render("listings/edit.ejs", {data, originalurl})
}

// delete listing

export const destroyListing = async(req, res) => {
    let {id} = req.params;
    
    await Listing.findByIdAndDelete(id);
    req.flash("error", "listing deleted successfully!");
    res.redirect("/listings")
    
}