const Listing = require("../models/listing");

function normalizeImage(rawImage) {
  const DEFAULT_IMAGE_URL =
    "https://images.unsplash.com/photo-1625505826533-5c80aca7d157?auto=format&fit=crop&w=800&q=60";
  if (typeof rawImage === "string" && rawImage.trim() !== "") {
    return { filename: "listingimage", url: rawImage.trim() };
  }
  if (rawImage && typeof rawImage === "object" && rawImage.url) {
    return { filename: rawImage.filename || "listingimage", url: rawImage.url };
  }
  return { filename: "listingimage", url: DEFAULT_IMAGE_URL };
}

module.exports.index = async (req, res) => {
  const allListings = await Listing.find({});
  res.render("listings/index.ejs", { allListings });
};

module.exports.renderNewForm = (req, res) => {
  res.render("listings/new.ejs");
};

module.exports.showListing = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id)
    .populate({
      path: "reviews",
      populate: {
        path: "author",
      },
    })
    .populate("owner");
  if (!listing) {
    req.flash("error", "Cannot find that listing!");
    return res.redirect("/listings");
  }
  console.log(listing);
  res.render("listings/show.ejs", { listing });
};

module.exports.createListing = async (req, res, next) => {
  let url = req.file.path;
  let filename = req.file.filename;

  const listingData = {
    ...req.body.listing,
    image: normalizeImage(req.body.listing.image),
    owner: req.user._id,
  };
  const newListing = new Listing(listingData);
  newListing.image = { url, filename };
  await newListing.save();
  req.flash("success", "new Listing Created!");
  res.redirect("/listings");
};

module.exports.renderEditForm = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  if (!listing) {
    req.flash("error", "Cannot find that listing!");
    return res.redirect("/listings");
  }
  let originalImageUrl = listing.image.url;
  originalImageUrl = originalImageUrl.replace("/upload","/upload/w_250");
  res.render("listings/edit.ejs", { listing, originalImageUrl });
};

module.exports.updateListing = async (req, res) => {
  let { id } = req.params;
  // const listing = await Listing.findById(id);
  // if (!listing) {
  //   req.flash("error", "Cannot find that listing!");
  //   return res.redirect("/listings");
  // }
  // const listingData = {
  //   ...req.body.listing,
  //   image:
  //     req.body.listing.image && req.body.listing.image.trim() !== ""
  //       ? normalizeImage(req.body.listing.image)
  //       : listing.image || normalizeImage(),
  // };

  // let listing = await Listing.findByIdAndUpdate(id, listingData, {
  //   runValidators: true,
  //   new: true,
  // });
  let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });

  if (typeof req.file != "undefined") {
    let url = req.file.path;
    let filename = req.file.filename;
    listing.image = { url, filename };
    await listing.save();
  }

  req.flash("success", "Listing Updated!");
  res.redirect(`/listings/${id}`);
};

module.exports.destroyListing = async (req, res) => {
  let { id } = req.params;
  let deletedListing = await Listing.findByIdAndDelete(id);
  console.log(deletedListing);
  req.flash("success", " Listing deleted!");
  res.redirect("/listings");
};
