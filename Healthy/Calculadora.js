const conexion = require('./conect');
const JsonChido = require('../Index.json');
const Swal = require('sweetalert2');
let id = JsonChido.id_usuario;
let usuario = JsonChido.Nombre;
function calcular() {
    var edad = document.getElementById("años").value;
    var peso = document.getElementById("Peso").value;
    var altura = document.getElementById("Altura").value;
    var act = document.querySelector('input[name=Act]:checked').value;
    var Sexo = document.querySelector('input[name=sexo]:checked').value;
    if (edad <= 15 || peso <= 30 || altura <= 120) {
        Swal.fire({
            heightAuto: false,
            title: 'Datos no validos',
            text: '',
            background: '#555',
            color: 'white',
            icon: 'warning',
            confirmButtonText: 'OK',
            width: '500px',
        })
    } else {
        var calorias;
        if (Sexo == "Masculino") {
            calorias = (parseInt(peso) * 10) + (6.25 * parseInt(altura)) - (5 * parseInt(edad)) + 5;
        } else {
            calorias = (parseInt(peso) * 10) + (6.25 * parseInt(altura)) - (5 * parseInt(edad)) - 161;
        }
        switch (parseInt(act)) {
            case 1:
                calorias = calorias * 1.2;
                break;

            case 2:
                calorias = calorias * 1.375;
                break;

            case 3:
                calorias = calorias * 1.55;
                break;

            case 4:
                calorias = calorias * 1.725;
                break;

            case 5:
                calorias = calorias * 1.99;
                break;

            default:
                break;
        }
        let final = Math.round(calorias);
        console.log(final);
        validacion(final);

    }
}

function validacion(final) {
    var calorasB = 'Genial! ' + usuario + '  ' + 'Tus calorias diarias son: ' + final;
    $query = `SELECT * FROM calorias WHERE users_id_user=${id}`;
    conexion.query($query, function (err, rows, fields) {
        if (err) {
            console.log("Error en el query");
            console.log(err);
            return;
        }
        else {
            console.log("todo bien", rows, fields)
                Swal.fire({
                    heightAuto: false,
                    title: 'Guardado',
                    background: '#555',
                    color: 'white',
                    text: calorasB,
                    icon: 'success',
                    width: '500px',
                }).then((result) => {
                    if (result.isConfirmed) {
                        location.href = "SelectMenu.html"
                    }
                })
                insertCalorias(final);
        }

    })
}

function insertCalorias(calorias) {
    console.log(id)
    $query = `INSERT INTO calorias (Ncalorias, users_id_user) VALUES ('${calorias}','${id}')`;
    conexion.query($query, function (err, rows) {
        if (err) {
            console.log("no funciona query");
            console.log(err);
            return;
        }
        console.log("si jala");
    });
}
