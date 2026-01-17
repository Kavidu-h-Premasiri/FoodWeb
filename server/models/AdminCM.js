const mongoose = require("mongoose")

const AdminCMSchema = mongoose.Schema({
    name:String,
    image:String,
    des:String,
    price:Number
})

const AdminCMModel = mongoose.model("admincm",AdminCMSchema)
module.exports = AdminCMModel