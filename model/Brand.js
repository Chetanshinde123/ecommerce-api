import mongoose from "mongoose";

const Schema = mongoose.Schema;

const BrandSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    images: {
      type: String,
      default:
        "https://cdns.faridagupta.com/media/catalog/product/full_image/p/a/parinaz_nazia_cotton_silk_kurta_02.jpg",
      required: true
    },
    products: [
      {
        type: Schema.Types.ObjectId,
        ref: "Product"
      }
    ]
  },
  { timestamps: true }
);

const Brand = mongoose.model("Brand", BrandSchema);

export default Brand;
