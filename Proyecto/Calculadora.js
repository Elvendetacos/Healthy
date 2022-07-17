const conexion = require('./conectar');
const JsonChido = require('../Index.json');
const { default: Swal } = require('sweetalert2');
let id = JsonChido.id_usuario;
let usuario = JsonChido.Nombre;
function calcular(){
var ed = document.getElementById('edad').value;
var pe = document.getElementById('peso').value;
var al = document.getElementById('altura').value;
var se = document.getElementById('sexo').value;
var ac = document.getElementById('activ').value;
if(ed<=15 || pe<=30 || al<=120){
    Swal.fire({
        heightAuto: false,
        title: 'Datos no validos',
        text: '',
        icon: 'warning',
        confirmButtonText: 'OK',
        width:'500px',    
    })
}else{
if(ed===''||pe===''||al===''||se===''||ac===''){
    alert("Error")
}else{
        var calorias;
        if(se == 'M' ){
    
            calorias = (parseInt(pe) * 10) + (6.25 * parseInt(al)) - (5 * parseInt(ed)) + 5;
            console.log(calorias);
        } else{
            calorias = (parseInt(pe) * 10) + (6.25 * parseInt(al)) - (5 * parseInt(ed)) -161;
            console.log(calorias);
        }
    
        switch (parseInt(ac)) {
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
        validacion(final)
    }
}

function validacion(final){
    var xd1 = 'Genial! '+usuario+'  '+'Tus calorias diarias son: ' + final;
    $query = `SELECT * FROM calorias WHERE users_id_user=${id}`;
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
                    title: 'Guardado',
                    text: xd1,
                    icon: 'success',
                    confirmButtonText: 'OK',
                    width:'500px',    
                })
                insertCalorias(final);
            }else{
                let resp=rows[0].Ncalorias;
                Swal.fire({
                    heightAuto: false,
                    title: 'Encontramos datos ya registrados',
                    text: 'Tus calorias son: '+resp,
                    icon: 'info',
                    confirmButtonText: 'OK',
                    width:'500px', 
                })
                }
            }
    
    })
}
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
