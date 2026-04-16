const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");

const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  // image: {
  //   filename: {
  //     type: String,
  //     default: "listingimage",
  //   },
  //   url: {
  //     type: String,

  //     default:
  //       "https://www.bontravelindia.com/wp-content/uploads/2023/01/Sikkim-Tourism-Best-Places-to-Visit-in-Sikkim.jpg",
  //     set: (v) =>
  //       v === ""
  //         ? "https://www.bontravelindia.com/wp-content/uploads/2023/01/Sikkim-Tourism-Best-Places-to-Visit-in-Sikkim.jpg"
  //         : v,
  //   },
  // },

  image: {
    url: String,
    filename: String,
  },

  price: { type: Number, default: 0 },
  location: String,
  country: String,
  reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }],
  owner:{
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

listingSchema.post("findOneAndDelete", async (listing) => {
  if (listing) {
    await Review.deleteMany({ _id: { $in: listing.reviews } });
  }
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
