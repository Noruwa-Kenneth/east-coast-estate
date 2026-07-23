// const express = require("express");
// const cors = require("cors");
// const nodemailer = require("nodemailer");
// require("dotenv").config();

// const app = express();

// // Middleware
// app.use(cors());
// app.use(express.json());

// // Home Route
// app.get("/", (req, res) => {
//     res.send("Backend is running!");
// });

// // Email Transporter
// const transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS,
//     },
// });

// // Contact Route
// app.post("/contact", async (req, res) => {
//     const { name, phone, email, service, message } = req.body;

//     try {

//         if (!name || !email || !message) {
//     return res.status(400).json({
//         success: false,
//         message: "Please fill in all required fields.",
//     });
// }
//         await transporter.sendMail({
//             from: process.env.EMAIL_USER,
//             to: process.env.EMAIL_USER,
//             replyTo: email,
//               subject: `New Website Inquiry from ${name}`,

//             text: `
// New Contact Form Submission

// --------------------------------

// Name: ${name}

// Phone: ${phone}

// Email: ${email}

// Service Needed: ${service}

// Message:

// ${message}

// --------------------------------
//             `,

//            html: `
//     <h2>📩 New Contact Form Submission</h2>
//     <hr>

//     <p><strong>Name:</strong> ${name}</p>

//     <p><strong>Phone:</strong> ${phone || "Not provided"}</p>

//     <p><strong>Email:</strong> ${email}</p>

//     <p><strong>Service Needed:</strong> ${service || "Not specified"}</p>

//     <hr>

//     <h3>Message</h3>

//     <p>${message.replace(/\n/g, "<br>")}</p>
// `,
//         });

//         res.status(200).json({
//             success: true,
//             message: "Message sent successfully!",
//         });

//     } catch (error) {
//         console.error("Email Error:", error);

//         res.status(500).json({
//             success: false,
//             message: "Failed to send message.",
//         });
//     }
// });

// // Start Server
// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//     console.log(`🚀 Server running on http://localhost:${PORT}`);
// });

const express = require("express");
const cors = require("cors");
require("dotenv").config();

const pool = require("./config/db");
const reviewRoutes = require("./routes/reviewRoutes");
const adminRoutes = require("./routes/adminRoutes");

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