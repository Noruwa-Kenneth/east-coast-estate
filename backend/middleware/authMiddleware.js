const jwt = require("jsonwebtoken");

/*=========================================
VERIFY ADMIN TOKEN
=========================================*/

const verifyToken = (req, res, next) => {

    const authHeader = req.headers.authorization;

    if (!authHeader) {

        return res.status(401).json({

            success: false,

            message: "Access denied. No token provided."

        });

    }

    const token = authHeader.split(" ")[1];

    if (!token) {

        return res.status(401).json({

            success: false,

            message: "Invalid token."

        });

    }

    try {

        const decoded = jwt.verify(

            token,

            process.env.JWT_SECRET

        );

        req.admin = decoded;

        next();

    }

    catch (error) {

        return res.status(401).json({

            success: false,

            message: "Token expired or invalid."

        });

    }

};

module.exports = verifyToken;