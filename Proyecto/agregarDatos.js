const conexion = require('./conectar');
function cargarDatos() {
    let name = document.getElementById("nombre").value;

    $query = `INSERT INTO weyes (nombre) VALUES ('${name}')`;
    conexion.query($query, function (err, rows) {
        if (err) {
            console.log("no funciona query");
            console.log(err);
            return;
        }
        console.log("si jala");
        alert("agregado correctamente")
        location.href="Registro.html"

    });

    
}

function mostrarDatos() {
    $query = `Select *from weyes;`;
    conexion.query($query, function (err, rows, fields) {
        const log = rows.length;
        for (var i = 0; i < log; i++) {
            console.log(rows[i].id_vatos + " :" + rows[i].nombre)
        }
    });
}

function tablaDatos() {
    $query = `SELECT * FROM weyes`;
    var tablita = document.getElementById('table');
    conexion.query($query, function (err, rows, fields) {
        if (err) {
            console.log("Error en el query");
            console.log(err);
            return;
        }
        else {
            console.log("jalo", rows, fields)
            var cadena

            const long = rows.length;
            for (var i = 0; i < long; i++) {
                const element = rows[i];
                cadena += element.id_vatos + " " + element.nombre + " " + "\n";

                var newRow = tablita.insertRow(-1);

                var celdaId = newRow.insertCell(0);
                var celdaNombre = newRow.insertCell(1);

                var TextId = document.createTextNode(element.id_vatos);
                var textUser = document.createTextNode(element.nombre);

                celdaId.appendChild(TextId);
                celdaNombre.appendChild(textUser);
            }
            console.log(cadena);

        }

    })
}

function busqueda() {
    var busqueda = document.getElementById("search").value
    $query = `SELECT * FROM weyes WHERE nombre = '${busqueda}'`;
    var tablita = document.getElementById('tableSearch');
    conexion.query($query, function (err, rows, fields) {
        if (err) {
            console.log("Error en el query");
            console.log(err);
            return;
        }
        else {
            console.log("toodo bien", rows, fields)

            if (rows.length == 0) {
                alert("No hay nada")
            }
            else {
                var cadena = "";
                const long = rows.length;
                for (let i = 0; i < long; i++) {
                    const element = rows[i];
                    cadena += element.id_vatos + " " + element.nombre + " " + "\n";

                    var newRow = tablita.insertRow(-1);

                    var celdaId = newRow.insertCell(0);
                    var celdaNombre = newRow.insertCell(1);

                    var TextId = document.createTextNode(element.id_vatos);
                    var textUser = document.createTextNode(element.nombre);

                    celdaId.appendChild(TextId);
                    celdaNombre.appendChild(textUser);
                }
                console.log(cadena);

            }
        }

    })
}


