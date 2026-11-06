require("dotenv").config()

const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const crypto = require("crypto")
const rateLimit = require("express-rate-limit")

const EmployeeModel = require("./models/Employees.js")
const AdminModel = require("./models/Admin.js")
const AdminHomeModel = require("./models/AdminHome.js")
const AdminCMModel = require("./models/AdminCM.js")
const AdminFFModel = require("./models/AdminFF.js")
const AdminRMModel = require("./models/AdminRM.js")
const Order = require("./models/Order.js")

// ---------- configuration (everything secret comes from the environment) ----------
const { MONGO_URL, JWT_SECRET, ADMIN_EMAIL, ADMIN_PASSWORD } = process.env
const PORT = process.env.PORT || 3002
const CLIENT_ORIGIN = (process.env.CLIENT_ORIGIN || "http://localhost:5173").split(",").map((s) => s.trim())

for (const [name, value] of Object.entries({ MONGO_URL, JWT_SECRET, ADMIN_EMAIL, ADMIN_PASSWORD })) {
  if (!value) {
    console.error(`Missing environment variable ${name}. Copy server/.env.example to server/.env and fill it in.`)
    process.exit(1)
  }
}

const app = express()
app.use(express.json({ limit: "100kb" }))
app.use(cors({ origin: CLIENT_ORIGIN }))

mongoose
  .connect(MONGO_URL)
  .then(() => console.log("Mongodb connected"))
  .catch((err) => console.log("Mongodb error", err))

// ---------- helpers ----------
const safeEqual = (a, b) => {
  const x = Buffer.from(String(a)), y = Buffer.from(String(b))
  return x.length === y.length && crypto.timingSafeEqual(x, y)
}
const sign = (role, extra = {}) => jwt.sign({ role, ...extra }, JWT_SECRET, { expiresIn: "8h" })
const isHash = (s) => typeof s === "string" && /^\$2[aby]\$/.test(s)
const wrap = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next)

// token check: any logged-in user, or admin only
const auth = (adminOnly) => (req, res, next) => {
  const header = req.headers.authorization || ""
  const token = header.startsWith("Bearer ") ? header.slice(7) : null
  if (!token) return res.status(401).json({ message: "Login required" })
  try {
    const payload = jwt.verify(token, JWT_SECRET)
    if (adminOnly && payload.role !== "admin") return res.status(403).json({ message: "Admin access only" })
    req.user = payload
    next()
  } catch {
    res.status(401).json({ message: "Session expired, please log in again" })
  }
}
const requireUser = auth(false)
const requireAdmin = auth(true)

const loginLimiter = rateLimit({ windowMs: 15 * 60 * 1000, limit: 30, standardHeaders: true, legacyHeaders: false, message: { message: "Too many attempts, try again later" } })

// ---------- auth ----------
// signup
app.post("/", loginLimiter, wrap(async (req, res) => {
  const { name, email, password } = req.body || {}
  if (![name, email, password].every((v) => typeof v === "string" && v.trim())) return res.status(400).json({ message: "Name, email and password are required" })
  if (password.length < 6) return res.status(400).json({ message: "Password must be at least 6 characters" })
  const mail = email.trim().toLowerCase()
  if (await EmployeeModel.findOne({ email: mail })) return res.status(409).json({ message: "This email is already registered" })
  const user = await EmployeeModel.create({ name: name.trim(), email: mail, password: await bcrypt.hash(password, 10) })
  res.status(201).json({ _id: user._id, name: user.name, email: user.email })
}))

// login (passwords created before hashing was added are upgraded on first successful login)
app.post("/login", loginLimiter, wrap(async (req, res) => {
  const { email, password } = req.body || {}
  if (typeof email !== "string" || typeof password !== "string") return res.status(400).json({ message: "Email and password are required" })
  const user = await EmployeeModel.findOne({ email: email.trim().toLowerCase() })
  let ok = false
  if (user) {
    if (isHash(user.password)) ok = await bcrypt.compare(password, user.password)
    else if (safeEqual(user.password, password)) { ok = true; user.password = await bcrypt.hash(password, 10); await user.save() }
  }
  if (!ok) return res.status(401).json({ message: "Incorrect email or password" })
  res.json({ status: "success", token: sign("user", { id: String(user._id) }), name: user.name })
}))

// admin login (credentials come from environment variables, never from source code)
app.post("/admin", loginLimiter, (req, res) => {
  const { email, password } = req.body || {}
  if (typeof email === "string" && typeof password === "string" && safeEqual(email.toLowerCase(), ADMIN_EMAIL.toLowerCase()) && safeEqual(password, ADMIN_PASSWORD)) {
    return res.json({ success: true, token: sign("admin") })
  }
  res.status(401).json({ success: false, message: "Invalid admin credentials" })
})

// ---------- foods ----------
// every food collection has the same CRUD shape: public read, admin-only write
const foodRoutes = (path, Model) => {
  app.get(path, wrap(async (req, res) => res.json(await Model.find())))
  app.post(path, requireAdmin, wrap(async (req, res) => res.status(201).json(await Model.create(req.body))))
  app.put(`${path}/:id`, requireAdmin, wrap(async (req, res) => {
    const updated = await Model.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    if (!updated) return res.status(404).json({ message: "Not found" })
    res.json(updated)
  }))
  app.delete(`${path}/:id`, requireAdmin, wrap(async (req, res) => {
    const deleted = await Model.findByIdAndDelete(req.params.id)
    if (!deleted) return res.status(404).json({ message: "Not found" })
    res.json({ message: "Deleted successfully" })
  }))
}
foodRoutes("/adminhome", AdminHomeModel)
foodRoutes("/admincm", AdminCMModel)
foodRoutes("/adminff", AdminFFModel)
foodRoutes("/adminrm", AdminRMModel)

// general foods table (add / edit / delete from the admin food table)
app.get("/adminFoods", wrap(async (req, res) => res.json(await AdminModel.find())))
app.post("/adminPage", requireAdmin, wrap(async (req, res) => res.status(201).json(await AdminModel.create(req.body))))
app.put("/adminFoods/:id", requireAdmin, wrap(async (req, res) => {
  const updated = await AdminModel.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
  if (!updated) return res.status(404).json({ message: "Not found" })
  res.json(updated)
}))
app.delete("/adminFoods/:id", requireAdmin, wrap(async (req, res) => {
  const deleted = await AdminModel.findByIdAndDelete(req.params.id)
  if (!deleted) return res.status(404).json({ message: "Not found" })
  res.json({ message: "Deleted successfully" })
}))
app.get("/home", wrap(async (req, res) => res.json(await AdminModel.find({ category: "home" }))))

// ---------- orders ----------
app.post("/orders", requireUser, wrap(async (req, res) => {
  const { items } = req.body || {}
  if (!Array.isArray(items) || items.length === 0 || items.length > 100) return res.status(400).json({ message: "Cart is empty" })
  const clean = []
  for (const it of items) {
    const price = Number(it.price), qty = Number(it.qty)
    if (!it || typeof it.name !== "string" || !Number.isFinite(price) || price < 0 || !Number.isInteger(qty) || qty < 1 || qty > 100) return res.status(400).json({ message: "Invalid item in cart" })
    clean.push({ productId: String(it.productId || ""), name: it.name.slice(0, 120), price, qty, image: typeof it.image === "string" ? it.image : "" })
  }
  // the total is calculated here, so the browser cannot change it
  const totalPrice = clean.reduce((sum, it) => sum + it.price * it.qty, 0)
  await new Order({ items: clean, totalPrice }).save()
  res.status(201).json({ message: "Order placed successfully" })
}))

app.get("/orders", requireAdmin, wrap(async (req, res) => res.json(await Order.find().sort({ createdAt: -1 }))))

// ---------- errors ----------
app.use((err, req, res, next) => {
  console.error(err)
  res.status(err.name === "ValidationError" || err.name === "CastError" ? 400 : 500).json({ message: err.name === "ValidationError" || err.name === "CastError" ? err.message : "Something went wrong" })
})

app.listen(PORT, () => console.log("Server is running on port", PORT))
