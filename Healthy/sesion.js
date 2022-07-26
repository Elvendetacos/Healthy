const conexion = require('./conect')
const alerta = require('sweetalert2')
const CrearJson = require('../LocalData/CrearJson');
let final
let date = new Date()
function validarIS(){
    const dia = [
        'domingo',
        'lunes',
        'martes',
        'miércoles',
        'jueves',
        'viernes',
        'sábado',
    ];
    const numeroDia = new Date().getDay();
    const nombreDia = dia[numeroDia];

    if(nombreDia == "domingo"){
        final = dias(date,8);
    }else if(nombreDia == "lunes"){
        final = dias(date,7);
    }else if(nombreDia == "martes"){
        final = dias(date,13);
    }else if(nombreDia == "miércoles"){
        final = dias(date,12);
    }else if(nombreDia == "jueves"){
        final = dias(date,11);
    }else if(nombreDia == "viernes"){
        final = dias(date,10);
    }else{

    }

    console.log("Nombre de día de la semana: ", nombreDia);
    let user = document.getElementById("usr").value;
    let pass = document.getElementById("pss").value;
    console.log(user)
    console.log(pass)
    $query = `SELECT * FROM users WHERE name = '${user}' AND password = '${pass}'`;

    conexion.query($query, function (err, rows, fields) {
        if (err) {
            console.log("Error en el query");
            console.log(err);
            return;
        }
        else {
            console.log("todo bien", rows, fields)
            if (rows.length == 0){
                alerta.fire({
                    heightAuto: false,
                    title: 'Error!',
                    text: 'Uario o contraseña invalidos',
                    icon: 'error',
                    background: '#555',
                    color: 'White',
                    confirmButtonText: 'OK',
                    width:'500px',      
                })
            }

            else {
                var datos={
                    id_usuario : rows[0].id_user,
                    Nombre: rows[0].name
                };
                var num = rows[0].id_user; 
                CrearJson.GuardarJson(datos);
                let conteo = rows[0].calculadora;
                let dos = dias(date, 0)
                if(conteo == 0){
                    $query = `update users set dia_final='${final}' where id_user = '${num}'`;
                    conexion.query($query, function (err, rows) {
                        if (err) {
                            console.log("no funciona query");
                            console.log(err);
                            return;
                        }else{
                            location.href = "Menuchikito.html"
                        }
                    });
                }else{
                    if (dos >= rows[0].dia_final){
                        $query = `update users set calculadora=0, dia_final='${final}' where id_user = '${num}'`;
                        location.href = "Calculadora.html"
                    }else{
                        location.href = "Menuchikito.html"
                    }
                }
            }
        }
    })

    function dias(datea, days){
            var res = new Date(datea);
            res.setDate(res.getDate() + days);
            return res;
    } 
}


