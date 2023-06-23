const { default: axios } = require("axios");
const { Router } = require("express");
const { UserModel } = require("../Models/user.model");
const fs = require("fs");
const { Parser } = require("json2csv");
const userRoute = Router();

// FETCHING THE USERS DATA FROM THE API & STORING IT IN MONGODB
userRoute.get("/fetch-store", async (req, res) => {
  try {
    const allUsers = await axios.get("https://gorest.co.in/public-api/users");
    const finalUsers = allUsers.data.data;
    await UserModel.deleteMany();
    const storedusers = await UserModel.insertMany(finalUsers);
    res.status(200).send(storedusers);
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: error.message });
  }
});
// ROUTE TO FETCH THE USERS DATA
userRoute.get("/", async (req, res) => {
  try {
    const allUsers = await UserModel.find({});
    res.status(200).send(allUsers);
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: error.message });
  }
});
// ROUTE TO PATCH/EDIT THE DATA OF THE SPECIFIED USER
userRoute.patch("/:id", async (req, res) => {
  try {
    const foundId = await UserModel.findOne({ _id: req.params.id });
    if (foundId) {
      await UserModel.findByIdAndUpdate(req.params.id, req.body);
      res.status(200).send({ message: "User details updated successfully." });
    } else {
      res.status(400).send({ message: "Invalid ID." });
    }
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});
// ROUTE TO EXPORT IN CSV FILES
userRoute.get("/export", async (req, res) => {
  try {
    const users = await UserModel.find({}, "-_id -__v");
    const jsonToCsv = new Parser();
    const csvData = jsonToCsv.parse(users);
    const filePath = "./users.csv";
    fs.writeFileSync(filePath, csvData, "utf-8");
    res.download(filePath, "users.csv", () => {
      fs.unlinkSync(filePath);
    });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

module.exports = { userRoute };
