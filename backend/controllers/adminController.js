const pool = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

/*=========================================
LOGIN ADMIN
=========================================*/

const loginAdmin = async (req, res) => {

    try {

        console.log("Headers:", req.headers);
console.log("Body:", req.body);

const { username, password } = req.body || {};

        if (!username || !password) {

            return res.status(400).json({

                success: false,
                message: "Username and password are required."

            });

        }

        const result = await pool.query(

            "SELECT * FROM admins WHERE username = $1",

            [username]

        );

        if (result.rows.length === 0) {

            return res.status(401).json({

                success: false,
                message: "Invalid username or password."

            });

        }

        const admin = result.rows[0];

        const passwordMatch = await bcrypt.compare(

            password,

            admin.password

        );

        if (!passwordMatch) {

            return res.status(401).json({

                success: false,
                message: "Invalid username or password."

            });

        }

        const token = jwt.sign(

            {

                id: admin.id,

                username: admin.username

            },

            process.env.JWT_SECRET,

            {

                expiresIn: "24h"

            }

        );

        res.json({

            success: true,

            message: "Login successful.",

            token,

            admin: {

                id: admin.id,

                username: admin.username

            }

        });

    }

    catch (error) {

        console.error(error);

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

module.exports = {

    loginAdmin

};