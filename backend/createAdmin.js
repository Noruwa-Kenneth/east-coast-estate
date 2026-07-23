const bcrypt = require("bcrypt");
const pool = require("./config/db");

async function createAdmin() {

    try {

        const username = "admin";

        const password = "Admin123!";

        const hashedPassword = await bcrypt.hash(password, 10);

        await pool.query(

            `
            INSERT INTO admins (username, password)
            VALUES ($1, $2)
            `,

            [username, hashedPassword]

        );

        console.log("✅ Admin created successfully.");

        process.exit();

    }

    catch(error){

        console.error(error);

        process.exit();

    }

}

createAdmin();