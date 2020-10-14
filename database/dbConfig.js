const {createPool} = require('mysql');

const pool = createPool({
    port: 3306,
    host: 'localhost',
    user: 'root',
    password: 'pass@word1',
    database: 'bank'
});

module.exports = pool;