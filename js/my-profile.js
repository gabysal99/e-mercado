//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    document.getElementById("guardar").addEventListener("click", function () {
        
        var user = document.getElementById('user');
        var nombreC = document.getElementById('nombrecomp');
        var edad = document.getElementById('edad');
        var email = document.getElementById('email');
        var telefono = document.getElementById('telefono');
        
        //if (user.value === "" || nombreC.value === "" || edad.value === "" || email.value === "" || telefono.value === "") {console.log()
           // alert("Todos los campos son requeridos")
        //}
        //else {
            localStorage.setItem('Datos', JSON.stringify({
                "user": user.value,
                "nombreC": nombreC.value,
                "edad": edad.value,
                "email": email.value,
                "telefono": telefono.value
            }));
            window.location = "my-profile.html"
        //}
    })
});

document.addEventListener("DOMContentLoaded", function(e){
    let datos = localStorage.getItem('Datos')
  
    if (datos) {
      datos = JSON.parse(datos);
      
      datos.innerText = datos.innerHTML + 'Datos'
    }
    
})