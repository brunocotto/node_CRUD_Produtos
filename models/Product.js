const mongoose = require("mongoose")

const Product = mongoose.model("Product", {
    name: String,
    price: Number,
    approved: Boolean,
})

module.exports = Product