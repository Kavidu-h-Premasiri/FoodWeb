const mongoose = require("mongoose")

const AdminFFSchema = mongoose.Schema({
    name:String,
    image:String,
    des:String,
    price:Number
})

const AdminFFModel = mongoose.model("adminff",AdminFFSchema)
module.exports = AdminFFModel