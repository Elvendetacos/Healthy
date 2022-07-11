const conexion = require('./conectar');
const JsonChido = require('../Index.json');
let id = JsonChido.id_usuario;
let usuario = JsonChido.Nombre;
function calcular(){
var ed = document.getElementById('edad').value;
var pe = document.getElementById('peso').value;
var al = document.getElementById('altura').value;
var se = document.getElementById('sexo').value;
var ac = document.getElementById('activ').value;
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
              
              console.log(calorias);
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
        insertCalorias(final);
        myvariable=Genial: '+usuario+'\n'+'Tus calorias diarias son: ' + final;
        Swal.fire({
            heightAuto: false,
            text: '',
            icon: 'success',
            confirmButtonText: 'Cool',
            width:'500px',
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
