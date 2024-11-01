require("dotenv").config();

const express = require("express");
const cors = require("cors");
const Route = require("./routes/route");

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  })
);

app.use("/api", Route);

app.listen(PORT, () => {
  console.log(`Server started on PORT ${PORT}`);
});