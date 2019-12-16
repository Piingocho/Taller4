import { createPool } from 'promise-mysql';

const datosDB = {
    database: {
        host: 'localhost',
        user: 'root',
        password: '12345678',
        database: 'pagos'
    }
}

const pool = createPool(datosDB.database);

pool.getConnection()
    .then(connection => {
        pool.releaseConnection(connection);
        console.log("DB conectada.");
    });

export default pool;