const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, default: "user" }
});

const User = mongoose.model("User", UserSchema, "users");

mongoose.connect("mongodb://127.0.0.1:27017/golden_dragon")
  .then(async () => {
    console.log("✅ MongoDB Connected - Seeding admin");

    const adminExists = await User.countDocuments({email: "admin@test.com"});
    if (adminExists === 0) {
      const admin = new User({
        name: "Admin",
        email: "admin@test.com",
        password: "admin123",
        role: "admin"
      });
      await admin.save();
      console.log("✅ Admin user created: admin@test.com / admin123");
    } else {
      console.log("ℹ️ Admin user already exists");
    }

    mongoose.connection.close();
    process.exit(0);
  })
  .catch(err => {
    console.error("Seed failed:", err);
    process.exit(1);
  });

