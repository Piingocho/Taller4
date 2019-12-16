import mysql from 'mysql-promise';


const con = mysql();
con.configure({
  "host": 'localhost',
  "user": 'root',
  "password": '',
  "database": 'pagos'
});


export const prueba = async ()=>{
    const datos = await con.query("SELECT * FROM inventario");
    console.log(datos);
}