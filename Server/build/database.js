"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const promise_mysql_1 = require("promise-mysql");
const datosDB = {
    database: {
        host: 'localhost',
        user: 'root',
        password: '12345678',
        database: 'pagos'
    }
};
const pool = promise_mysql_1.createPool(datosDB.database);
pool.getConnection()
    .then(connection => {
    pool.releaseConnection(connection);
    console.log("DB conectada.");
});
exports.default = pool;
