const mysql = require('mysql2');
const connection = mysql.createConnection({
    host:'localhost',// 127.0.0.1o192.168.x.x
    user:'Brian',// usuario en mysql
    password:'Holacomoestas',// Contraseña del usuario de mysql
    database:'usuarios',// Base de datos creada previamente
    port:'3306'// Puerto de conexion de mysql
});
connection.connect(function(err){
    if(err){
        console.log(err.code);
        console.log(err.fatal);
        return;
    }
    else{
        console.log('conexion exitosa');
   }
});
module.exports=connection;