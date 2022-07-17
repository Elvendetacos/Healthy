const conexion = require('./conectar')
//const JsonChido = require('../Index.json');
const Swal = require('sweetalert2')
const CrearJson = require('../LocalData/CrearJson');
function validarIS(){
    let user = document.getElementById("txtuser").value;
    let pass = document.getElementById("txtpass").value;
    $query = `SELECT * FROM users WHERE name = '${user}' AND password = '${pass}'`;

    conexion.query($query, function (err, rows, fields) {
        if (err) {
            console.log("Error en el query");
            console.log(err);
            return;
        }
        else {
            console.log("todo bien", rows, fields)
            
            if (rows.length == 0) {
                Swal.fire({
                    heightAuto: false,
                    title: 'Error!',
                    text: 'Uario o contraseña invalidos',
                    icon: 'error',
                    confirmButtonText: 'OK',
                    width:'500px',      
                })
            }

            else {
                var datos={
                    id_usuario : rows[0].id_user,
                    Nombre: rows[0].name
                };
                CrearJson.GuardarJson(datos);
                location.href = "Ingreso.html"
            }
        }
    })
    
}


