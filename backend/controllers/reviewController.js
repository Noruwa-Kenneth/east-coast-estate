const pool = require("../config/db");

/*=========================================
CREATE REVIEW
=========================================*/

const createReview = async (req, res) => {

    try {

        const {
            full_name,
            email,
            location,
            service,
            rating,
            review,
        } = req.body;

        if (
            !full_name ||
            !email ||
            !service ||
            !rating ||
            !review
        ) {

            return res.status(400).json({

                success: false,
                message: "Please fill in all required fields.",

            });

        }

        const query = `
            INSERT INTO reviews
            (
                full_name,
                email,
                location,
                service,
                rating,
                review
            )
            VALUES
            ($1,$2,$3,$4,$5,$6)
            RETURNING *;
        `;

        const values = [

            full_name,
            email,
            location,
            service,
            rating,
            review,

        ];

        const result = await pool.query(query, values);

        res.status(201).json({

            success: true,
            message: "Review submitted successfully!",
            review: result.rows[0],

        });

    }

    catch (error) {

        console.error(error);

        res.status(500).json({

            success: false,
            message: "Server error.",

        });

    }

};

/*=========================================
GET ALL PENDING REVIEWS
=========================================*/

const getPendingReviews = async (req, res) => {

    try {

        const result = await pool.query(`

            SELECT *

            FROM reviews

            WHERE status='Pending'

            ORDER BY created_at DESC

        `);

        res.json({

            success: true,

            reviews: result.rows,

        });

    }

    catch (error) {

        console.error(error);

        res.status(500).json({

            success: false,

            message: "Failed to fetch reviews.",

        });

    }

};

/*=========================================
EXPORTS
=========================================*/


/*=========================================
APPROVE REVIEW
=========================================*/

const approveReview = async (req, res) => {

    try {

        const { id } = req.params;

        const result = await pool.query(
            `
            UPDATE reviews
            SET status = 'Approved'
            WHERE id = $1
            RETURNING *;
            `,
            [id]
        );

        if (result.rows.length === 0) {

            return res.status(404).json({

                success: false,

                message: "Review not found.",

            });

        }

        res.json({

            success: true,

            message: "Review approved successfully.",

            review: result.rows[0],

        });

    }

    catch (error) {

        console.error(error);

        res.status(500).json({

            success: false,

            message: "Server error.",

        });

    }
};

/*=========================================
GET APPROVED REVIEWS
=========================================*/

const getApprovedReviews = async (req, res) => {

    try {

        const result = await pool.query(`
            SELECT *
            FROM reviews
            WHERE status = 'Approved'
            ORDER BY created_at DESC
        `);

        res.json({

            success: true,

            reviews: result.rows,

        });

    }

    catch (error) {

        console.error(error);

        res.status(500).json({

            success: false,

            message: "Failed to fetch reviews.",

        });

    }

};


module.exports = {

    createReview,

    getPendingReviews,

    approveReview,

     getApprovedReviews,

};