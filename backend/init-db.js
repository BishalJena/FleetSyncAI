const fs = require('fs').promises;
const path = require('path');
const mysql = require('mysql');
const util = require('util');

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    multipleStatements: true
});

const query = util.promisify(connection.query).bind(connection);

async function executeSQL(filename) {
    const sql = await fs.readFile(path.join(__dirname, filename), 'utf8');
    await query(sql);
    console.log(`Executed ${filename} successfully`);
}

async function initializeDatabase(retries = 5, delay = 5000) {
    let attempts = 0;
    while (attempts < retries) {
        try {
            await executeSQL('init.sql');
            await executeSQL('seed.sql');
            console.log('Database initialized and seeded successfully');
            return;
        } catch (err) {
            attempts++;
            console.error(`Error initializing database (attempt ${attempts}/${retries}):`, err.message);
            if (attempts === retries) {
                throw new Error('Failed to initialize database after multiple attempts');
            }
            await new Promise(res => setTimeout(res, delay));
        }
    }
}

initializeDatabase()
    .then(() => {
        console.log('Database setup complete');
        connection.end();
    })
    .catch(err => {
        console.error('Database initialization failed:', err);
        connection.end();
        process.exit(1);
    });