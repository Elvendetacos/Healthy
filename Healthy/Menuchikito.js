const conectar = require('./conect')
const jonson = require("../Index.json")
const Swal = require('sweetalert2')

function cargar(){
    var insertar = document.getElementById("us");
    insertar.innerHTML = jonson.Nombre
}

function cerrarS(){
    Swal.fire({
        heightAuto: false,
        title: "¿Estas seguro?",
        icon: "warning",
        showCancelButton: true,
        background: '#555',
        color:'white',
        confirmButtonText: "!Sí! :c",
        cancelButtonText: "!No! :D",
        reverseButtons: true
    }).then((result) =>{
        if(result.isConfirmed){
            location.href="inicio.html"
        }else{

        }
    })
}

function calculadora(){
    location.href="CalculadoraV/Calculadora.html"
}

function Reporte(){
    const busqueda = jonson.id_usuario
    $query = `SELECT * FROM users WHERE id_user = '${busqueda}' `;
    conectar.query($query, function (err, rows, fields) {
        if (err) {
            console.log("Error en el query");
            console.log(err);
            return;
        }else {
            if(rows[0].calculadora == 0){
                Swal.fire({
                    heightAuto: false,
                    title: "No podemos generar el reporte",
                    text: "Por favor, ingrese a su calculo semanal",
                    icon: "warning",
                    background: '#555',
                    color:'white',
                })
            }else{
                location.href="Reporte.html"
            }
        }
    })
}

function Menu(){
    const busqueda = jonson.id_usuario
    $query = `SELECT * FROM users WHERE id_user = '${busqueda}' `;
    conectar.query($query, function (err, rows, fields) {
        if (err) {
            console.log("Error en el query");
            console.log(err);
            return;
        }else {
            if(rows[0].calculadora == 0){
                location.href="Calculadora.html"
            }else{
                location.href="Menufinal.html"
            }
        }
    })
}