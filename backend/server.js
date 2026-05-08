const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();

app.use(cors({
  origin: "*"
}));
app.use(express.json());

// MongoDB connection
console.log(process.env.MONGO_URI);

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch((err) => console.log(err));

// Routes (PUT THIS BEFORE app.listen)
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/tasks", require("./routes/taskRoutes"));

// Test route
app.get("/", (req, res) => {
    res.send("API is running...");
});

const PORT = process.env.PORT || 5021;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});