import mongoose from "mongoose";
const Schema = mongoose.Schema;

const ColorSchema = new Schema(
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
    // products: [
    //   {
    //     type: Schema.Types.ObjectId,
    //     ref: "Product"
    //   }
    // ]
  },
  { timestamps: true }
);

const Color = mongoose.model("Color", ColorSchema);

export default Color;
