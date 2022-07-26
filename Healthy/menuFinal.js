const conexion = require('./conect');
const JsonChido = require('../menu.json');
const usuario = require('../Index.json')
const CrearJson = require('../LocalData/CrearJson');
var x = null;

console.log(JsonChido.Domingo.cena);
x = document.getElementById("Ldesayuno");
x.innerHTML = JsonChido.Lunes.desayuno; 
x.value = JsonChido.Lunes.desayuno;

x = document.getElementById("Lcomida");
x.innerHTML = JsonChido.Lunes.comida; 
x.value = JsonChido.Lunes.comida;

x = document.getElementById("Lcena");
x.innerHTML = JsonChido.Lunes.cena;
x.value = JsonChido.Lunes.cena; 


x = document.getElementById("Mdesayuno");
x.innerHTML = JsonChido.Martes.desayuno; 
x.value = JsonChido.Martes.desayuno;

x = document.getElementById("Mcomida");
x.innerHTML = JsonChido.Martes.comida; 
x.value = JsonChido.Martes.comida;

x = document.getElementById("Mcena");
x.innerHTML = JsonChido.Martes.cena; 
x.value = JsonChido.Martes.cena;


x = document.getElementById("MIdesayuno");
x.innerHTML = JsonChido.Miercoles.desayuno; 
x.value = JsonChido.Miercoles.desayuno;

x = document.getElementById("MIcomida");
x.innerHTML = JsonChido.Miercoles.comida; 
x.value = JsonChido.Miercoles.comida;

x = document.getElementById("MIcena");
x.innerHTML = JsonChido.Miercoles.cena;
x.value = JsonChido.Miercoles.cena;


x = document.getElementById("Jdesayuno");
x.innerHTML = JsonChido.Jueves.desayuno; 
x.value = JsonChido.Jueves.desayuno;

x = document.getElementById("Jcomida");
x.innerHTML = JsonChido.Jueves.comida; 
x.value = JsonChido.Jueves.comida;

x = document.getElementById("Jcena");
x.innerHTML = JsonChido.Jueves.cena; 
x.value = JsonChido.Jueves.cena;


x = document.getElementById("Vdesayuno");
x.innerHTML = JsonChido.Viernes.desayuno; 
x.value = JsonChido.Viernes.desayuno;

x = document.getElementById("Vcomida");
x.innerHTML = JsonChido.Viernes.comida; 
x.value = JsonChido.Viernes.comida;

x = document.getElementById("Vcena");
x.innerHTML = JsonChido.Viernes.cena; 
x.value = JsonChido.Viernes.cena;


x = document.getElementById("Sdesayuno");
x.innerHTML = JsonChido.Sabado.desayuno; 
x.value = JsonChido.Sabado.desayuno;

x = document.getElementById("Scomida");
x.value = JsonChido.Sabado.comida;
x.innerHTML = JsonChido.Sabado.comida; 

x = document.getElementById("Scena");
x.innerHTML = JsonChido.Sabado.cena; 
x.value =  JsonChido.Sabado.cena;

x = document.getElementById("Ddesayuno");
x.innerHTML = JsonChido.Domingo.desayuno; 
x.value = JsonChido.Domingo.desayuno;

x = document.getElementById("Dcomida");
x.innerHTML = JsonChido.Domingo.comida; 
x.value = JsonChido.Domingo.comida;

x = document.getElementById("Dcena");
x.innerHTML = JsonChido.Domingo.cena; 
x.value = JsonChido.Domingo.cena;


let idR = ""; 
function obtenerID(comp){
    idR = comp.value;
    var idreceta= {
        receta : idR
    }
    CrearJson.JsonReceta(idreceta);
    location.href = "recetas.html";
}

$query = `SELECT calculadora FROM users WHERE id_user = '${usuario.id_usuario}' AND name = '${usuario.Nombre}'`;
conexion.query($query, function (err, rows, fields) {
    if (err) {
        console.log("Error en el query");
        console.log(err);
        return;
    }
    else {
        if (rows.length == 0) {
            console.log("No hay nada");
        }
        else {
            if (rows[0].calculadora == 1) {

            }
            else{
                $query = `update users set calculadora=1 where id_user = '${usuario.id_usuario}'`;
                conexion.query($query, function (err, rows, fields) {
                    if (err) {
                        console.log("Error en el query");
                        console.log(err);
                        return;
                    }
                    else {
                    validarSemana();
                    }
                })
            }

        }


    }
}

)

function validarSemana() {
    $query = `SELECT * FROM reportes WHERE users_id_user = '${usuario.id_usuario}'`;
    conexion.query($query, function (err, rows, fields) {
        if (err) {
            console.log("Error en el query");
            console.log(err);
            return;
        }
        else {
            if (rows.length == 0) {
                console.log("No hay nada");
                semana = 1;
                insertar(semana);
            }
            else {
                semana = rows.length + 1;
                insertar(semana);
            }


        }
    }

    )
}

function insertar(semana) {
    $query = `INSERT INTO reportes (Nsemana, users_id_user) VALUES ('${semana}','${usuario.id_usuario}')`;

    conexion.query($query, function (err, rows, fields) {
        if (err) {
            console.log("Error en el query");
            console.log(err);
            return;
        }
        else {
            console.log("todo bien", rows, fields)
            seleccionarR(semana, usuario.id_usuario)
        }

    })

}

function seleccionarR(semana, id) {
    $query = `SELECT id_reporte FROM reportes WHERE users_id_user = '${id}' AND Nsemana = '${semana}'`;
    conexion.query($query, function (err, rows, fields) {
        if (err) {
            console.log("Error en el query");
            console.log(err);
            return;
        }
        else {
            if (rows.length == 0) {
                console.log("No hay nada");
            }
            else {
                console.log(rows[0].id_reporte);
                insertarJsonChido(rows[0].id_reporte)
            }


        }
    }

    )
}

function insertarJsonChido(id) {
    $query = `INSERT INTO reportes_menu (Ld, Lc, Lce, Md, Mc, Mce, MId, MIc, MIce, Jd, Jc, Jce, Vd, Vc, Vce, Sd, Sc, Sce, Dd, Dc, Dce, reportes_id_reporte) VALUES ('${Ld}', '${Lc}', '${Lce}', '${Md}', '${Mc}', '${Mce}', '${MId}', '${MIc}', '${MIce}', '${Jd}', '${Jc}', '${Jce}', '${Vd}', '${Vc}', '${Vce}', '${Sd}', '${Sc}', '${Sce}', '${Dd}', '${Dc}', '${Dce}','${id}')`;

    conexion.query($query, function (err, rows, fields) {
        if (err) {
            console.log("Error en el query");
            console.log(err);
            return;
        }
        else {
            console.log("todo bien", rows, fields)

        }

    })
}


var Ld = JsonChido.Lunes.desayuno;
var Lc = JsonChido.Lunes.comida;
var Lce = JsonChido.Lunes.cena;
var Md = JsonChido.Martes.desayuno;
var Mc = JsonChido.Martes.comida;
var Mce = JsonChido.Martes.cena;
var MId = JsonChido.Miercoles.desayuno;
var MIc = JsonChido.Miercoles.comida;
var MIce = JsonChido.Miercoles.cena;
var Jd = JsonChido.Jueves.desayuno;
var Jc = JsonChido.Jueves.comida;
var Jce = JsonChido.Jueves.cena;
var Vd = JsonChido.Viernes.desayuno;
var Vc = JsonChido.Viernes.comida;
var Vce = JsonChido.Viernes.cena;
var Sd = JsonChido.Sabado.desayuno;
var Sc = JsonChido.Sabado.comida;
var Sce = JsonChido.Sabado.cena;
var Dd = JsonChido.Domingo.desayuno;
var Dc = JsonChido.Domingo.comida;
var Dce = JsonChido.Domingo.cena;