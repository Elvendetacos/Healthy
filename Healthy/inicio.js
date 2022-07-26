const as = document.querySelector("#grande");
const user = document.querySelector("#usr");
const pa = document.querySelector("#pss");
const user1 = document.querySelector("#usr1");
const pa1 = document.querySelector("#pss1");

alerta.fire({
    heightAuto: false,
    title: 'Bienvenido a HEALTHY',
    text:'Gracias por descargar la app!',
    background: '#555',
    color:'white',
    confirmButtonText: 'OK',
    width:'500px',    
})

function sig(){
    as.style.marginLeft = "-100%";
    as.style.transition = "all 0.5s"
    user.value = "";
    pa.value="";
}

function ant(){
    console.log(as)
    as.style.marginLeft = "0%";
    as.style.transition = "all 0.5s"
    user1.value = "";
    pa1.value="";
    console.log("que pedo");
}
