const Swal = require('sweetalert2');
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
            icon: 'warning',
            background: '#555',
            color: 'white',
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
        Swal.fire({
            heightAuto: false,
            title: "Tus calorias son:",
            text: final,
            icon: "info",
            showCancelButton: true,
            background: '#555',
            color: 'white',
            confirmButtonText: "Hacer otro cálculo",
            cancelButtonText: "Regresar al Home",
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                location.reload();
            } else {
                location.href = "../Menuchikito.html";
            }
        })

    }
}
