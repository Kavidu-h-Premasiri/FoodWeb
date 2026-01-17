require('dotenv').config(); 

const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const EmployeeModel = require("./models/Employees.js")
const AdminModel = require("./models/Admin.js")
const AdminHomeModel = require("./models/AdminHome.js")
const AdminCMModel = require("./models/AdminCM.js")
const AdminFFModel = require("./models/AdminFF.js")
const AdminRMModel = require("./models/AdminRM.js")
const Order = require("./models/Order");

const app= express()
app.use(express.json())
app.use(cors())

// mongoose.connect('mongodb://localhost:27017/cloths')
mongoose.connect(process.env.MONGO_URL)
.then(()=>console.log("Mongodb connected"))
.catch(err=> console.log("Mongodb error",err))

//signup
app.post('/',(req,res)=>{
    EmployeeModel.create(req.body)
    .then(employee=>res.json(employee))
    .catch(err=>res.status(500).json(err))
})

//login
app.post('/login',(req,res)=>{
    const {email,password} = req.body
    EmployeeModel.findOne({email:email})
        .then(user=>{
            if(user){
                if(user.password === password){
                    res.json("success")
                }else{
                    res.json("Password is incorrect")
                }
            }else{
                res.json("user doesn't exists")
            }
        })
})

//admin
const adminEmail = "Admin@gmail.com"
const adminPassword = "admin123"

app.post('/admin',(req,res)=>{
    const {email,password} = req.body

    if(email === adminEmail && password === adminPassword){
        res.json({
            success:true,
            message:"Admin login successfull"
        })
    }else{
        res.status(401).json({
            success:false,
            message: "Invalid admin credentials"
        })
    }
})

//Admin Foods
app.post("/adminPage", async (req, res) => {
  try {
    const food = await AdminModel.create(req.body)
    res.json(food)
  } catch (err) {
    res.status(500).json(err)
  }
})

// GET ALL FOODS
// app.get("/home",(req, res) => {
//   AdminModel.find()
//   .then(adminfoods => res.json(adminfoods))
//   .catch(err=>res.json(err))
// })

// UPDATE FOOD 
app.put("/adminFoods/:id", async (req, res) => {
  const updated = await AdminModel.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  )
  res.json(updated)
})

// DELETE FOOD
app.delete("/adminFoods/:id", async (req, res) => {
  await AdminModel.findByIdAndDelete(req.params.id)
  res.json({ message: "Deleted successfully" })
})


// GET ALL FOODS for home page
// app.get("/adminFoods", async (req, res) => {
//   const foods = await AdminModel.find()
//   res.json(foods)
// })

app.get("/home", async (req, res) => {
  try {
    const foods = await AdminModel.find({ category: "home" })
    res.json(foods)
  } catch (err) {
    res.status(500).json(err)
  }
})

//adminHome 
app.post("/adminhome",(req,res)=>{
    AdminHomeModel.create(req.body)
    .then(adminhome=>res.json(adminhome))
    .catch(err=>res.status(500).json(err))
})

//admincm
app.post("/admincm",(req,res)=>{
    AdminCMModel.create(req.body)
    .then(admincm=>res.json(admincm))
    .catch(err=>res.status(500).json(err))
})

//adminff
app.post("/adminff",(req,res)=>{
    AdminFFModel.create(req.body)
    .then(adminff=>res.json(adminff))
    .catch(err=>res.status(500).json(err))
})

//adminrm
app.post("/adminrm",(req,res)=>{
    AdminRMModel.create(req.body)
    .then(adminff=>res.json(adminff))
    .catch(err=>res.status(500).json(err))
})

//get data from database to Admincm
// const AdminCMModel = require("./models/AdminCM.js")

app.get("/admincm",(req,res)=>{
    AdminCMModel.find()
    .then(admincms=>res.json(admincms))
    .catch(err=>res.json(err))
})

//get data from database to Adminff
// const AdminFFModel = require("./models/AdminFF.js")

app.get("/adminff",(req,res)=>{
    AdminFFModel.find()
    .then(adminffs=>res.json(adminffs))
    .catch(err=>res.json(err))
})

//get data from database to Adminrm
// const AdminRMModel = require("./models/AdminRM.js")

app.get("/adminrm",(req,res)=>{
    AdminRMModel.find()
    .then(adminrms=>res.json(adminrms))
    .catch(err=>res.json(err))
})

//get data from database to AdminHome
// const AdminHomeModel = require("./models/AdminHome.js")

app.get("/adminhome",(req,res)=>{
    AdminHomeModel.find()
    .then(adminhomes=>res.json(adminhomes))
    .catch(err=>res.json(err))
})

//delete and edit admincm
// UPDATE admincm
app.put("/admincm/:id", async (req, res) => {
  try {
    const updated = await AdminCMModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )
    res.json(updated)
  } catch (err) {
    res.status(500).json(err)
  }
})

// DELETE admincm
app.delete("/admincm/:id", async (req, res) => {
  try {
    await AdminCMModel.findByIdAndDelete(req.params.id)
    res.json({ message: "Deleted successfully" })
  } catch (err) {
    res.status(500).json(err)
  }
})

//delte and edit adminff
// UPDATE adminff
app.put("/adminff/:id", async (req, res) => {
  try {
    const updated = await AdminFFModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )
    res.json(updated)
  } catch (err) {
    res.status(500).json(err)
  }
})

// DELETE adminff
app.delete("/adminff/:id", async (req, res) => {
  try {
    await AdminFFModel.findByIdAndDelete(req.params.id)
    res.json({ message: "Deleted successfully" })
  } catch (err) {
    res.status(500).json(err)
  }
})

//delete and edit adminhome
// UPDATE adminhome
app.put("/adminhome/:id", async (req, res) => {
  try {
    const updated = await AdminHomeModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )
    res.json(updated)
  } catch (err) {
    res.status(500).json(err)
  }
})

// DELETE adminhome
app.delete("/adminhome/:id", async (req, res) => {
  try {
    await AdminHomeModel.findByIdAndDelete(req.params.id)
    res.json({ message: "Deleted successfully" })
  } catch (err) {
    res.status(500).json(err)
  }
})

//delete and edit adminrm
// UPDATE adminrm
app.put("/adminrm/:id", async (req, res) => {
  try {
    const updated = await AdminRMModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )
    res.json(updated)
  } catch (err) {
    res.status(500).json(err)
  }
})

// DELETE adminrm
app.delete("/adminrm/:id", async (req, res) => {
  try {
    await AdminRMModel.findByIdAndDelete(req.params.id)
    res.json({ message: "Deleted successfully" })
  } catch (err) {
    res.status(500).json(err)
  }
})

/* SAVE ORDER */
app.post("/orders", async (req, res) => {
  try {
    const order = new Order(req.body);
    await order.save();
    res.status(201).json({ message: "Order placed successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* GET ORDERS (ADMIN) */
app.get("/orders", async (req, res) => {
  const orders = await Order.find().sort({ createdAt: -1 });
  res.json(orders);
});

const PORT = process.env.PORT || 3002 ;
app.listen(PORT,()=>{
    console.log("Server is running on port",PORT)
})