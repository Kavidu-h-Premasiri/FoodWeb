const mongoose = require("mongoose")

const AdminRMSchema = mongoose.Schema({
    name:String,
    image:String,
    des:String,
    price:Number
})

const AdminRMModel = mongoose.model("adminrm",AdminRMSchema)
module.exports = AdminRMModel