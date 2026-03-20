import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        trim: true 
    },
    price: {
        type: Number,
        required: [true, "Price is required"]
    },
  description: {
      type: String,
      required:false
    },
    quantity: {
        type: Number,
        required: [true, "Quantity is required"],
        min: [0, "Quantity cannot be negative"],
        default: 0
    },
});

// exportar o modelo
export default mongoose.model("Product", productSchema);

