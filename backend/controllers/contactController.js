const nodemailer = require("nodemailer");
const pool = require("../config/db");

// Email transporter
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

exports.sendContact = async (req, res) => {

    const { name, phone, email, service, message } = req.body;

    // Validation
    if (!name || !email || !message) {
        return res.status(400).json({
            success: false,
            message: "Please fill in all required fields.",
        });
    }

    try {

        // Save to PostgreSQL
        await pool.query(
            `
            INSERT INTO contacts
            (full_name, phone, email, service, message)
            VALUES ($1, $2, $3, $4, $5)
            `,
            [name, phone, email, service, message]
        );

        // Send email
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER,
            replyTo: email,

            subject: `New Website Inquiry from ${name}`,

            html: `
                <h2>📩 New Contact Form Submission</h2>
                <hr>

                <p><strong>Name:</strong> ${name}</p>

                <p><strong>Phone:</strong> ${phone || "Not provided"}</p>

                <p><strong>Email:</strong> ${email}</p>

                <p><strong>Service:</strong> ${service || "Not specified"}</p>

                <hr>

                <h3>Message</h3>

                <p>${message.replace(/\n/g, "<br>")}</p>
            `,
        });

        res.status(200).json({
            success: true,
            message: "Your message has been sent successfully!",
        });

    } catch (error) {

        console.error("Contact Error:", error);

        res.status(500).json({
            success: false,
            message: "Something went wrong. Please try again.",
        });

    }
};