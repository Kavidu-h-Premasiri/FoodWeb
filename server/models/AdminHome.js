const mongoose = require("mongoose")

const AdminHomeSchema = mongoose.Schema({
    name:String,
    image:String,
    des:String,
    price:Number
})

const AdminHomeModel = mongoose.model("adminHome",AdminHomeSchema)
module.exports = AdminHomeModel