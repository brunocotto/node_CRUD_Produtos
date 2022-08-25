const mongoose = require("mongoose")

//Modelo/schema MongoDB
const Product = mongoose.model("Product", {
    name: String,
    price: Number,
    approved: Boolean,
})

module.exports = Product