function registrar() {
    let pass = document.getElementById("pss1").value;
    let user = document.getElementById("usr1").value;
    
    $query = `SELECT * FROM users WHERE name = '${user}' AND password = '${pass}'`;

    conexion.query($query, function (err, rows, fields) {
        if (err) {
            console.log("Error en el query");
            console.log(err);
            return;
        }
        else {
            console.log("todo bien", rows, fields)
            if(pass==""||user==""){
                alerta.fire({
                    heightAuto: false,
                    title: 'Datos invalidos',
                    icon: 'error',	
                    width:'500px',
                    background: '#555',
                    color:'white',
                })
            }else{
                if (rows.length == 0) {
                    insertar(user,pass);
                }
                else {
                    alerta.fire({
                        heightAuto: false,
                        title: 'Ya existe un registro igual',
                        icon: 'error',	
                        width:'500px',
                        background: '#555',
                        color:'white',
                    })
                }
            }
        }

    })
}

function insertar(user,pass){
    $query = `INSERT INTO users (name, password) VALUES ('${user}','${pass}')`;
    conexion.query($query, function (err, rows) {
        if (err) {
            console.log("no funciona query");
            console.log(err);
            return;
        }
        alerta.fire({
            heightAuto: false,
            title: 'Registrado',
            icon: 'success',	
            width:'500px',
            background: '#555',
            color:'white',
        }).then((result) =>{
            if(result.isConfirmed){
                ant();
            }
        })
    });
}
