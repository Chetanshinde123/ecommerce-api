import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ProductSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    brand: {
      type: String,
      required: true
    },
    category: {
      type: String,
      ref: "Category",
      required: true
    },
    sizes: {
      type: String,
      enum: ["S", "M", "L", "XL", "XXL"],
      required: true
    },
    colors: [
      {
        type: String,
        required: true
      }
    ],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User"
    },
    images: [
      {
        type: String,
        required : true
      }
    ],
    reviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review"
      }
    ],
    price: {
      type: Number,
      required: true
    },
    totalQty: {
      type: Number,
      required: true
    },
    totalSold: {
      type: Number,
      required: true,
      default: 0
    }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true } // Usefull while using refernce to get full object of ref. Use .populate("ref name") Eg.reviews
  }
);

// Virtuals = It is the properties that does not persist on record inside our database,but upon querying we can have that upon model

// We are calculating average ratings

// Step 1: Find total number of ratings
ProductSchema.virtual("totalReviews").get(function(){ // We get access to this keyword in this function
  
  // this keyword contains whole data of product model
  const product = this 

  return product?.reviews.length
})

// Step 2 : Average Rating
ProductSchema.virtual("averageRating").get(function(){
  let ratingsTotal = 0
  const product = this
  // Applying forEach on reviews array to count ratings
  product?.reviews.forEach((review) => {
    ratingsTotal += review?.rating
  })

  // Finally gets average
  const totalRating = Number(ratingsTotal / product?.reviews?.length).toFixed("1") // .toFixed is use to set only 1 decimal point
  return totalRating
})

ProductSchema.virtual("qtyleft").get(function() {
  const product = this
  return product.totalQty - product.totalSold 
})

const Product = mongoose.model("Product", ProductSchema);

export default Product;
