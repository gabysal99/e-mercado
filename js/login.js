//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    document.getElementById("enviar").addEventListener("click", function () {
        var user = document.getElementById("nombre");
        var clave = document.getElementById("contrasena");
        
        if (user.value === "" || clave.value === "") {
            alert("Campos vacios :(")
        }
        else {
            if (user.value === "Gabi" && clave.value === "1234") {
                alert("Bienvenido a la pagina :)")
                localStorage.setItem('UsuarioLogueado', JSON.stringify({usuario: user.value}));
                window.location = "inicio.html"
            }
            else {
                alert("Usuario y/o contraseña incorrectos")
                alert("Usuario: Gabi - Contraseña: 1234 ;)")
            }
        }
        })
});