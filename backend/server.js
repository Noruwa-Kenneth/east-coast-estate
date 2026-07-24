
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const pool = require("./config/db");
const reviewRoutes = require("./routes/reviewRoutes");
const adminRoutes = require("./routes/adminRoutes");
const contactRoutes = require("./routes/contactRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.post("/debug", (req, res) => {
    console.log("DEBUG BODY:", req.body);

    res.json({
        body: req.body
    });
});
app.use("/reviews", reviewRoutes);
app.use("/admin", adminRoutes);
app.use("/contact", contactRoutes);

app.get("/", (req, res) => {
    res.send("East Coast Estates API is running...");
});

app.get("/test-db", async (req, res) => {

    try {

        const result = await pool.query("SELECT NOW()");

        res.json({
            success: true,
            message: "Database connected!",
            time: result.rows[0].now,
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }

});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {

    console.log(`Server running on port ${PORT}`);

});