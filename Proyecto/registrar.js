const conexion = require('./conectar');
function registrar() {
    let pass = document.getElementById("txtpass").value;
    let user = document.getElementById("txtuser").value;
    
    $query = `SELECT * FROM users WHERE name = '${user}' AND password = '${pass}'`;

    conexion.query($query, function (err, rows, fields) {
        if (err) {
            console.log("Error en el query");
            console.log(err);
            return;
        }
        else {
            console.log("todo bien", rows, fields)
            if(pass==""||user==""){
                alert("mi compa el pendejo")
            }else{
                if (rows.length == 0) {
                    insertar(user,pass);
                }
                else {
                    alert("ya existe un registro igual");
                }
            }
        }

    })
}

function insertar(user,pass){
    $query = `INSERT INTO users (name, password) VALUES ('${user}','${pass}')`;
    conexion.query($query, function (err, rows) {
        if (err) {
            console.log("no funciona query");
            console.log(err);
            return;
        }
        console.log("si jala");
        alert("registrado correctamente");
        location.href="Registro.html"
    });
}