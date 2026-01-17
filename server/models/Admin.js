const mongoose = require("mongoose")

const adminSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: String,
  des: String,
  price: Number,
  category: String
},{ timestamps: true })

const AdminModel = mongoose.model("AdminFoods",adminSchema)
module.exports=AdminModel