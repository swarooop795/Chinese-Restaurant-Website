const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const app = express();

// ================== MIDDLEWARE ==================
app.use(cors());
app.use(express.json());

const PORT = 5000;
const JWT_SECRET = "mySuperSecretKey123";

// ================== DATABASE ==================
mongoose.connect("mongodb://127.0.0.1:27017/golden_dragon")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// ================== SCHEMAS ==================
const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, default: "user" }
});

const FoodSchema = new mongoose.Schema({
  name: String,
  price: Number,
  category: String,
  image: String
});

const OrderSchema = new mongoose.Schema({
  userId: String,
  shippingAddress: {
    name: String,
    phone: String,
    address: String,
    city: String,
    pincode: String
  },
  items: Array,
  total: Number,
  status: { type: String, default: "Pending" },
  createdAt: { type: Date, default: Date.now }
});

const ReservationSchema = new mongoose.Schema({
  name: String,
  phone: String,
  date: String,
  time: String,
  people: Number
});


// ================== MODELS ==================
const User = mongoose.model("User", UserSchema);
const Food = mongoose.model("Food", FoodSchema);
const Order = mongoose.model("Order", OrderSchema);
const Reservation = mongoose.model("Reservation", ReservationSchema);


// Seed menu if empty
Food.countDocuments().then(count => {
  if (count === 0) {
    console.log('🌟 No menu items found. Run: node seed.js');
  }
});

// ================== AUTH MIDDLEWARE ==================
const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) return res.status(401).json({ message: "No token" });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    res.status(401).json({ message: "Invalid token" });
  }
};

// ================== AUTH APIs ==================
app.post("/register", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.json({ message: "Registered successfully" });
  } catch (err) {
    if (err.code === 11000) {
      res.status(400).json({ message: "This email id already exists" });
    } else {
      res.status(400).json({ message: "Registration failed" });
    }
  }
});

app.post("/login", async (req, res) => {
  const user = await User.findOne(req.body);

  if (!user) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign(
    { id: user._id, role: user.role },
    JWT_SECRET
  );

  res.json({ token, user });
});

// FIXED /profile route - proper formatting
app.get("/profile", authMiddleware, async (req, res) => {
  const user = await User.findById(req.user.id);
  res.json(user);
});

// ================== ADMIN USERS API ================== FIXED ROUTE!
app.get("/users/admin", authMiddleware, async (req, res) => {
  console.log("Users endpoint hit by:", req.user.role);
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: "Admin access only" });
  }
  const users = await User.find({}).select('-password');
  res.json(users);
});

// ================== MENU APIs ==================
app.get("/menu", async (req, res) => {
  const foods = await Food.find();
  res.json(foods);
});

app.post("/menu", async (req, res) => {
  const food = new Food(req.body);
  await food.save();
  res.json(food);
});

// ================== ORDER APIs ==================
app.post("/order", authMiddleware, async (req, res) => {
  const { items, total, shippingAddress } = req.body;
  
  if (!shippingAddress || !shippingAddress.name || !shippingAddress.address) {
    return res.status(400).json({ message: "Shipping address required" });
  }

  const order = new Order({
    userId: req.user.id,
    shippingAddress,
    items,
    total
  });

  await order.save();
  res.json(order);
});

app.get("/orders/user", authMiddleware, async (req, res) => {
  const orders = await Order.find({ userId: req.user.id });
  res.json(orders);
});

app.get("/orders/admin", async (req, res) => {
  const orders = await Order.find();
  res.json(orders);
});

// ================== ADMIN UPDATE STATUS ==================
app.put("/orders/:id/status", authMiddleware, async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: "Admin access only" });
  }
  const { status } = req.body;
  const validStatuses = ['Pending', 'Preparing', 'Out for Delivery', 'Delivered'];
  if (!validStatuses.includes(status)) {
    return res.status(400).json({ message: "Invalid status. Use: Pending, Preparing, Out for Delivery, Delivered" });
  }
  console.log("🔍 STATUS UPDATE: ID=", req.params.id, "STATUS=", status, "ADMIN=", req.user.role);
  const order = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true });
  if (!order) {
    console.log("❌ ORDER NOT FOUND ID:", req.params.id);
    return res.status(404).json({ message: "Order not found" });
  }
  res.json(order);
});

// ================== RESERVATION DELETE (ADMIN ONLY) ==================
app.delete("/reservation/:id", authMiddleware, async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: "Admin access only" });
  }
  try {
    console.log(`🗑️ Attempting to delete reservation ID: ${req.params.id} by admin: ${req.user.id}`);
    const deleted = await Reservation.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Reservation not found" });
    }
    console.log(`✅ Deleted reservation: ${req.params.id}`);
    res.json({ message: "Reservation deleted successfully" });
  } catch (err) {
    console.error(`❌ Delete error for ID ${req.params.id}:`, err);
    if (err.name === 'CastError') {
      return res.status(400).json({ message: "Invalid reservation ID format" });
    }
    res.status(500).json({ message: `Delete failed: ${err.message}` });
  }
});

// ================== RESERVATION APIs ==================

app.post("/reservation", async (req, res) => {
  const { name, date, time } = req.body;
  const existing = await Reservation.findOne({ name, date, time });
  if (existing) {
    return res.status(409).json({ message: "This customer reservation is already confirmed" });
  }
  const reservation = new Reservation(req.body);
  await reservation.save();
  res.json(reservation);
});


app.get("/reservation", async (req, res) => {
  const data = await Reservation.find();
  res.json(data);
});

// ================== PAYMENT (SIMULATION) ==================
app.post("/payment", (req, res) => {
  res.json({
    transactionId: "TXN" + Date.now(),
    status: "Success"
  });
});

// ================== ANALYTICS ==================
app.get("/analytics", async (req, res) => {
  const revenue = await Order.aggregate([
    {
      $group: {
        _id: null,
        totalRevenue: { $sum: "$total" }
      }
    }
  ]);

  res.json(revenue);
});

// ================== GLOBAL ERROR ==================
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: "Server error" });
});

// ================== START ==================
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log('✅ Users admin route active!');
});
