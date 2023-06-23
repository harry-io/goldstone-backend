const express = require("express");
const app = express();
const cors = require("cors");
const { connection } = require("./db");
const { userRoute } = require("./Routes/user.routes");
require("dotenv").config();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.status(200).send({ message: "Goldstone Backend." });
});
app.use("/users", userRoute);

app.listen(process.env.PORT, () => {
  connection();
  console.log(`Server running at PORT ${process.env.PORT}...`);
});
