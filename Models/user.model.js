const mongoose = require("mongoose");
const userSchema = mongoose.Schema(
  {
    Id: Number,
    name: String,
    email: String,
    gender: String,
    status: String,
    Created_at: Date,
    Updated_at: Date,
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

const UserModel = mongoose.model("user", userSchema);

module.exports = { UserModel };
