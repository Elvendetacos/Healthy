const conexion = require('./conect');
const usuario = require('../Index.json');

function cargar(){
    var usr = document.getElementById("us");
    usr.innerHTML = usuario.Nombre
}

$query = `SELECT * FROM reportes WHERE users_id_user = '${usuario.id_usuario}'`;
conexion.query($query, function (err, rows, fields) {
    if (err) {
        console.log("Error en el query");
        console.log(err);
        return;
    }
    else {
        let semanas = rows;
        var x = null;
        var option = null;
        for (var i = 0; i < semanas.length; i++) {
            x = document.getElementById('semanas');
            option = document.createElement('option');
            option.value = semanas[i].Nsemana;
            if (i == semanas.length - 1) {
                option.selected = "selected";
                option.text = "Semana " + (i + 1) + " (actual)";
            }
            else {
                option.text = "Semana " + (i + 1);
            }
            x.add(option);
        }
        tablaDatos(x.value);
    }
}

)


function tablaDatos(semana) {
    $query = `SELECT * FROM reportes where users_id_user = '${usuario.id_usuario}' AND Nsemana = '${semana}'`;

    conexion.query($query, function (err, rows, fields) {
        if (err) {
            console.log("Error en el query");
            console.log(err);
            return;
        }
        else {
            console.log(rows[0].id_reporte);
            insertarTable(rows[0].id_reporte);

        }

    })
}

let nombreC = "";
let caloriass = 0;
let dias = "";
let horas = "";
function insertarTable(reporte) {
    $query = `SELECT * FROM reportes_menu where reportes_id_reporte = '${reporte}'`;
    var tablita = document.getElementById('table');
    conexion.query($query, function (err, rows, fields) {
        if (err) {
            console.log("Error en el query");
            console.log(err);
            return;
        }
        else {

            nombreC = [rows[0].Ld, rows[0].Lc, rows[0].Lce, rows[0].Md, rows[0].Mc, rows[0].Mce, rows[0].MId, rows[0].MIc, rows[0].MIce, rows[0].Jd, rows[0].Jc, rows[0].Jce, rows[0].Vd, rows[0].Vc, rows[0].Vce, rows[0].Sd, rows[0].Sc, rows[0].Sce, rows[0].Dd, rows[0].Dc, rows[0].Dce
            ];

            dias = ["Lunes", "Lunes", "Lunes", "Martes", "Martes", "Martes", "Miercoles", "Miercoles", "Miercoles", "Jueves", "Jueves", "Jueves", "Viernes", "Viernes", "Viernes", "Sabado", "Sabado", "Sabado", "Domingo", "Domingo", "Domingo"];
            horas = ["Desayuno", "Comida", "Cena", "Desayuno", "Comida", "Cena", "Desayuno", "Comida", "Cena", "Desayuno", "Comida", "Cena", "Desayuno", "Comida", "Cena", "Desayuno", "Comida", "Cena", "Desayuno", "Comida", "Cena"];
            for (var i = 0; i < 21; i++) {

                name(i, nombreC)

            }

        }

    })



}

let total = null;

function name(i, nombreC) {
    $query = `SELECT calorias FROM recetas where nombre = '${nombreC[i]}'`;
    var tablita = document.getElementById('table');
    conexion.query($query, function (err, rows, fields) {
        if (err) {
            console.log("Error en el query");
            console.log(err);
            return;
        }
        else {
            let nada = rows[0].calorias;

            total = total + nada;
            console.log("🚀 ~ file: reporte.js ~ line 103 ~ total", total)

            var newRow = tablita.insertRow(-1);

            var celdaNombre = newRow.insertCell(0);
            var celdaCal = newRow.insertCell(1);
            var celDia = newRow.insertCell(2);
            var celHora = newRow.insertCell(3);

            var textNombre = document.createTextNode(nombreC[i]);
            var textCal = document.createTextNode(nada);
            var textDia = document.createTextNode(dias[i]);
            var textHora = document.createTextNode(horas[i]);

            celdaNombre.appendChild(textNombre);
            celdaCal.appendChild(textCal);
            celDia.appendChild(textDia);
            celHora.appendChild(textHora);
            if (i == 20) {
               var x = document.getElementById("totalK").innerHTML = total + " Kcal";
               total = null
            }
        }
    })
}

function generarR(){
    var select = document.getElementById("semanas").value;
    tablaDatos(select);
}