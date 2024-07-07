// const mysql = require('mysql');
// const util = require('util');
//
// const connection = mysql.createConnection({
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_NAME,
//     multipleStatements: true
// });
//
// const connectWithRetry = async (retries) => {
//     while (retries > 0) {
//         try {
//             await util.promisify(connection.connect.bind(connection))();
//             console.log('Connected to the database.');
//             return;
//         } catch (err) {
//             console.error('Error connecting to the database:', err.stack);
//             retries -= 1;
//             console.log(`Retrying... (${retries} retries left)`);
//             await new Promise(res => setTimeout(res, 5000));
//         }
//     }
//     throw new Error('Failed to connect to the database after multiple attempts.');
// };
//
// connectWithRetry(5).catch(err => {
//     console.error(err.message);
//     process.exit(1);
// });
//
// module.exports = connection;
