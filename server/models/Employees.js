const mongoose = require("mongoose")

const employeeSchema = mongoose.Schema({
    name:String,
    email:String,
    password:String
})

const EmployeeModel = mongoose.model("employees",employeeSchema)
module.exports=EmployeeModel