const mongoose = require("mongoose")

//Modelo/schema MongoDB
const User = mongoose.model('User', {
    name: String,
    email: String,
    password: String
})

module.exports = User