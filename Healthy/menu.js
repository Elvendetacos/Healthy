const conexion = require('./conect');
const JsonChido = require('../Index.json');
const CrearJson = require('../LocalData/CrearJson');
const Swal = require('sweetalert2')
let id = JsonChido.id_usuario;
var userCalorias = null;
let recetas = "";
$query = `SELECT * FROM calorias WHERE users_id_user = '${id}'`;
conexion.query($query, function (err, rows, fields) {

    if (err) {
        console.log("no funciona query");
        console.log(err);
        return;
    }
    else {
        console.log("si jala");
        userCalorias = rows[0].Ncalorias;
        repartirCal(userCalorias);
    }

});


function GuardarMenu() {
    var menu = {
        Lunes: {
            desayuno: document.getElementById("Ldesayuno").value,
            comida: document.getElementById("Lcomida").value,
            cena: document.getElementById("Lcena").value
        },
        Martes: {
            desayuno: document.getElementById("Mdesayuno").value,
            comida: document.getElementById("Mcomida").value,
            cena: document.getElementById("Mcena").value
        },
        Miercoles: {
            desayuno: document.getElementById("MIdesayuno").value,
            comida: document.getElementById("MIcomida").value,
            cena: document.getElementById("MIcena").value
        },
        Jueves: {
            desayuno: document.getElementById("Jdesayuno").value,
            comida: document.getElementById("Jcomida").value,
            cena: document.getElementById("Jcena").value
        },
        Viernes: {
            desayuno: document.getElementById("Vdesayuno").value,
            comida: document.getElementById("Vcomida").value,
            cena: document.getElementById("Vcena").value
        },
        Sabado: {
            desayuno: document.getElementById("Sdesayuno").value,
            comida: document.getElementById("Scomida").value,
            cena: document.getElementById("Scena").value
        },
        Domingo: {
            desayuno: document.getElementById("Ddesayuno").value,
            comida: document.getElementById("Dcomida").value,
            cena: document.getElementById("Dcena").value
        }

    }
    CrearJson.GuardarJsonMenu(menu);
    Swal.fire({
        heightAuto: false,
        title: "Guardando Menú",
        text: "Espere un momento",
        background: '#555',
        color: 'white',
        timer: 3000,
        timerProgressBar: true,
        showConfirmButton:false,
    }).then(function(result) {
        if (result.dismiss === "timer") {
            location.href="Menufinal.html"
        }
    })    
}


function repartirCal(calorias) {
    var desayuno = calorias * 0.20;
    var mediaMaana = calorias * 0.10;
    var comida = calorias * 0.35;
    var merienda = calorias * 0.10;
    var cena = calorias * 0.40;

    $query = `SELECT nombre, calorias FROM recetas WHERE calorias > '${calorias * 0.15}' AND calorias < '${desayuno}' `;
    conexion.query($query, function (err, rows, fields) {
        if (err) {
            console.log("no funciona query");
            console.log(err);
            return;
        }
        else {
            console.log("si jala");
            if (log == 0) {
                console.log("no hay nada")
            }
            else {
                recetas = rows;
                insertarDes(recetas)
                var log = rows.length;
                for (var i = 0; i < log; i++) {
                    console.log("desayuno: " + recetas[i].nombre + " " + rows[i].calorias)
                }

            }
        }

    });


    $query = `SELECT nombre, calorias FROM recetas WHERE calorias > '${calorias * 0.25}' AND calorias < '${comida}' `;
    conexion.query($query, function (err, rows, fields) {
        if (err) {
            console.log("no funciona query");
            console.log(err);
            return;
        }
        else {
            console.log("si jala");
            const log = rows.length;
            if (log == 0) {
                console.log("no hay nada")
            }
            else {
                recetas = rows;
                let arbolote = new arbol(250, recetas[0].nombre);
               
                for (var k = 1; k < log; k++) {
                    colocar(recetas, k, arbolote,log)
                }
                console.log("si paso")
                //insertarCom(recetas);
                for (var i = 0; i < log; i++) {
                    console.log("comida: " + rows[i].nombre + " " + rows[i].calorias)
                }
            }
        }

    });

    
    
    function colocar(recetas, k, arbol, log) {
        $query = `SELECT calorias FROM recetas WHERE nombre = '${recetas[k].nombre}' `;
        conexion.query($query, function (err, rows, fields) {
            if (err) {
                console.log("no funciona query");
                console.log(err);
                return;
            }
            else {
                console.log("si jala");
                arbol.anadir(rows[0].calorias, recetas[k].nombre)
                console.log(rows[0].calorias, recetas[k].nombre)

                if(k== log-1){
                    inOrden(arbol.Raiz);
                    recetas = arrayT;
                    insertarCom(recetas)
                    console.log(arrayT)
             
                }
            }
        })
    }
    
    $query = `SELECT nombre, calorias FROM recetas WHERE calorias > '${calorias * 0.25}' AND calorias < '${cena}' `;
    conexion.query($query, function (err, rows, fields) {
        if (err) {
            console.log("no funciona query");
            console.log(err);
            return;
        }
        else {
            console.log("si jala");
            const log = rows.length;
            if (log == 0) {
                console.log("no hay nada")
            }
            else {
                recetas = rows;
                //insertarCen(recetas);
                let arbolCe = new arbol(200, recetas[0].nombre)
                for (var i = 1; i < log; i++) {
                    colocarCe(recetas, i, arbolCe,log)
                    console.log("cena: " + rows[i].nombre + " " + rows[i].calorias)
                }
            }
        }

    });

}
function colocarCe(recetas, k, arbol, log) {
    $query = `SELECT calorias FROM recetas WHERE nombre = '${recetas[k].nombre}' `;
    conexion.query($query, function (err, rows, fields) {
        if (err) {
            console.log("no funciona query");
            console.log(err);
            return;
        }
        else {
            console.log("si jala");
            arbol.anadir(rows[0].calorias, recetas[k].nombre)
            console.log(rows[0].calorias, recetas[k].nombre)

            if(k== log-1){
                preOrden(arbol.Raiz);
                recetas = arrayCe;
                insertarCen(recetas)
                console.log(arrayCe)
         
            }
        }
    })
}



function insertarDes(desayunos) {
    var x = null;
    var option = null;
    console.log(desayunos.length);
    for (var i = 0; i < desayunos.length; i++) {
        x = document.getElementById('Ldesayuno');
        option = document.createElement('option');
        option.value = desayunos[i].nombre;
        if (i == 0) {
            option.selected = "selected";
        }
        option.text = desayunos[i].nombre;
        x.add(option);
    }
    for (var i = 0; i < desayunos.length; i++) {
        x = document.getElementById('Mdesayuno');
        option = document.createElement('option');
        if (i == 1) {
            option.selected = "selected";
        }
        option.value = desayunos[i].nombre;
        option.text = desayunos[i].nombre;
        x.add(option);
    }
    for (var i = 0; i < desayunos.length; i++) {
        x = document.getElementById('MIdesayuno');
        option = document.createElement('option');
        option.value = desayunos[i].nombre;
        if (i == 2) {
            option.selected = "selected";
        }
        option.text = desayunos[i].nombre;
        x.add(option);
        option.text = desayunos[i].nombre;
        x.add(option);
    }
    for (var i = 0; i < desayunos.length; i++) {
        x = document.getElementById('Jdesayuno');
        option = document.createElement('option');
        option.value = desayunos[i].nombre;
        if (i == 3) {
            option.selected = "selected";
        }
        option.text = desayunos[i].nombre;
        x.add(option);
        option.text = desayunos[i].nombre;
        x.add(option);
    }
    for (var i = 0; i < desayunos.length; i++) {
        x = document.getElementById('Vdesayuno');
        option = document.createElement('option');
        option.value = desayunos[i].nombre;
        if (i == 4) {
            option.selected = "selected";
        }
        option.text = desayunos[i].nombre;
        x.add(option);
        option.text = desayunos[i].nombre;
        x.add(option);
    }
    for (var i = 0; i < desayunos.length; i++) {
        x = document.getElementById('Sdesayuno');
        option = document.createElement('option');
        option.value = desayunos[i].nombre;
        if (i == 5) {
            option.selected = "selected";
        }
        option.text = desayunos[i].nombre;
        x.add(option);
        option.text = desayunos[i].nombre;
        x.add(option);
    }
    for (var i = 0; i < desayunos.length; i++) {
        x = document.getElementById('Ddesayuno');
        option = document.createElement('option');
        option.value = desayunos[i].nombre;
        if (i == 6) {
            option.selected = "selected";
        }
        option.text = desayunos[i].nombre;
        x.add(option);
        option.text = desayunos[i].nombre;
        x.add(option);
    }
}

function insertarCom(comida) {
    var x = null;
    var option = null;
    console.log(comida);
    for (var i = 0; i < comida.length; i++) {
        x = document.getElementById('Lcomida');
        option = document.createElement('option');
        option.value = comida[i];
        if (i == comida.length - 1) {
            option.selected = "selected";
        }
        option.text = comida[i];
        x.add(option);
    }
    for (var i = 0; i < comida.length; i++) {
        x = document.getElementById('Mcomida');
        option = document.createElement('option');
        option.value = comida[i];
        if (i == comida.length - 2) {
            option.selected = "selected";
        }
        option.text = comida[i];
        x.add(option);
    }
    for (var i = 0; i < comida.length; i++) {
        x = document.getElementById('MIcomida');
        option = document.createElement('option');
        option.value = comida[i];
        if (i == comida.length - 3) {
            option.selected = "selected";
        }
        option.text = comida[i];
        x.add(option);
    }
    for (var i = 0; i < comida.length; i++) {
        x = document.getElementById('Jcomida');
        option = document.createElement('option');
        option.value = comida[i];
        if (i == comida.length - 4) {
            option.selected = "selected";
        }
        option.text = comida[i];
        x.add(option);
    }
    for (var i = 0; i < comida.length; i++) {
        x = document.getElementById('Vcomida');
        option = document.createElement('option');
        option.value = comida[i];
        if (i == comida.length - 5) {
            option.selected = "selected";
        }
        option.text = comida[i];
        x.add(option);
    }
    for (var i = 0; i < comida.length; i++) {
        x = document.getElementById('Scomida');
        option = document.createElement('option');
        option.value = comida[i];
        if (i == comida.length - 6) {
            option.selected = "selected";
        }
        option.text = comida[i];
        x.add(option);
    }
    for (var i = 0; i < comida.length; i++) {
        x = document.getElementById('Dcomida');
        option = document.createElement('option');
        option.value = comida[i];
        option.text = comida[i];
        if (i == comida.length - 7) {
            option.selected = "selected";
        }
        x.add(option);
    }


}

function insertarCen(cena) {
    var x = null;
    var option = null;
    console.log(cena.length);
    for (var i = 0; i < cena.length; i++) {
        x = document.getElementById('Lcena');
        option = document.createElement('option');
        if (i == 0) {
            option.selected = "selected";
        }
        option.value = cena[i];
        option.text = cena[i];
        x.add(option);
    }
    for (var i = 0; i < cena.length; i++) {
        x = document.getElementById('Mcena');
        option = document.createElement('option');
        option.value = cena[i];
        if (i == 1) {
            option.selected = "selected";
        }
        option.text = cena[i];
        x.add(option);
    }
    for (var i = 0; i < cena.length; i++) {
        x = document.getElementById('MIcena');
        option = document.createElement('option');
        option.value = cena[i];
        if (i == 2) {
            option.selected = "selected";
        }
        option.text = cena[i];
        x.add(option);
    }
    for (var i = 0; i < cena.length; i++) {
        x = document.getElementById('Jcena');
        option = document.createElement('option');
        option.value = cena[i];
        if (i == 3) {
            option.selected = "selected";
        }
        option.text = cena[i];
        x.add(option);
    }
    for (var i = 0; i < cena.length; i++) {
        x = document.getElementById('Vcena');
        option = document.createElement('option');
        option.value = cena[i];
        if (i == 4) {
            option.selected = "selected";
        }
        option.text = cena[i];
        x.add(option);
    }
    for (var i = 0; i < cena.length; i++) {
        x = document.getElementById('Scena');
        option = document.createElement('option');
        option.value = cena[i];
        if (i == 5) {
            option.selected = "selected";
        }
        option.text = cena[i];
        x.add(option);
    }
    for (var i = 0; i < cena.length; i++) {
        x = document.getElementById('Dcena');
        option = document.createElement('option');
        option.value = cena[i];
        if (i == 6) {
            option.selected = "selected";
        }
        option.text = cena[i];
        x.add(option);
    }
}

class nodo {
    //Constru0ctor para añadir el dato a la raiz
    constructor(dato, index) {
        this.dato = dato
        this.index = index
    }
    setNDH(nodoDH) {
        this.nodohd = nodoDH
    }
    setNHI(nodoHI) {
        this.nodohi = nodoHI
    }
    getDato() {
        return this.Dato;
    }
    getIndex() {
        return this.index;
    }
}

class arbol {
    //construcor del arbol binario
    constructor(Raiz, index) {
        this.Raiz = new nodo(Raiz, index)
    }
    //añadir nuevo dato al arbol binario 
    anadir(dato, index) {
        //Declarar nuevo nodo que sera añadido al arbol
        let nuevo = new nodo(dato, index)
        //Declarar variables para recorrer el arbol binario
        let anterior = null, recorre = this.Raiz
        //Evaluar destino del nuevo nodo
        while (recorre != null) {
            anterior = recorre
            recorre = (index > recorre.index) ? recorre.nodohd : recorre.nodohi
        }
        if (index > anterior.index) {
            anterior.setNDH(nuevo)
        }
        else {
            anterior.setNHI(nuevo)
        }
    }
}
const arrayT = [];
//imprimir arbol binario en orden
const inOrden = (raiz) => {
    if (raiz.nodohi != null) {
        inOrden(raiz.nodohi)
    }
    arrayT.push(raiz.index);
    console.log(" | " + raiz.index + " | ")
    if (raiz.nodohd != null) {
        inOrden(raiz.nodohd)
    }
}
const arrayCe = [];
const preOrden = (raiz) => {
    arrayCe.push(raiz.index);
    console.log(" | " + raiz.index + " | ")
    if (raiz.nodohi != null) {
        preOrden(raiz.nodohi)
    }
    if (raiz.nodohd != null) {
        preOrden(raiz.nodohd)
    }
}
const posOrden = (raiz) => {
    if (raiz.nodohi != null) {
        posOrden(raiz.nodohi)
    }
    if (raiz.nodohd != null) {
        posOrden(raiz.nodohd)
    }
    console.log(" | " + raiz.index + " | ")
}


//creacion del arbolito ahora si xd
/*let arbolito = new arbol(250, 100)
arbolito.anadir(250, "ola")
arbolito.anadir(250, 150)
arbolito.anadir(222, 170)
arbolito.anadir(219, 130)
arbolito.anadir(90, 120)
arbolito.anadir(129, 140)
arbolito.anadir(91, 160)
arbolito.anadir(131, 180)
arbolito.anadir(214, 70)
arbolito.anadir(86, 60)
arbolito.anadir(128, 80)
arbolito.anadir(0, 10)
arbolito.anadir(0, 11)
arbolito.anadir(0, 9)

inOrden(arbolito.Raiz)
console.log("-------pre----------")
preOrden(arbolito.Raiz)
console.log("-------pos----------")
posOrden(arbolito.Raiz)*/