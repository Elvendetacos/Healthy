const conexion = require('./conect');
const recetaElegida = require('../vReceta.json');
receta = recetaElegida.receta;
console.log("🚀 ~ file: recetas.js ~ line 4 ~ receta", receta)

let nombre = "";
let ingredientes = "";
$query = `SELECT * FROM recetas WHERE nombre = '${receta}'`;
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
            console.log(rows[0].id_receta);
            nombre = rows;
            $query = `SELECT nombre FROM ingredientes WHERE recetas_id_receta = '${nombre[0].id_receta}'`;
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
                        ingredientes = rows;
                        console.log(ingredientes[0].nombre);
                        insertarHtml(nombre, ingredientes);
                    }


                }
            }

            )
        }


    }
}

)
function insertarHtml(receta, ingredientes) {

    title = document.getElementById('nameR');
    var titulo = document.createElement('h2');
    titulo.innerHTML = receta[0].nombre;
    title.appendChild(titulo);

    principal = document.getElementById('ing');
    var titulo = document.createElement('h3');
    titulo.innerHTML = "Ingredientes";
    principal.appendChild(titulo);

    var content = "";
    for (var i = 0; i < ingredientes.length; i++) {
        content = document.createElement('li');
        content.innerHTML = ingredientes[i].nombre;
        principal.appendChild(content);
    }

    var titulo = document.createElement('h3');
    titulo.innerHTML = "Elaboracion";
    principal.appendChild(titulo);

    var parrafo = document.createElement('p');
    parrafo.innerHTML = receta[0].pasos;
    principal.appendChild(parrafo);
}


function regresar(){
    location.href="Menufinal.html";
}
