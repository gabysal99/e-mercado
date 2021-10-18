const CATEGORIES_URL = "https://japdevdep.github.io/ecommerce-api/category/all.json";
const PUBLISH_PRODUCT_URL = "https://japdevdep.github.io/ecommerce-api/product/publish.json";
const CATEGORY_INFO_URL = "https://japdevdep.github.io/ecommerce-api/category/1234.json";
const PRODUCTS_URL = /*"https://japdevdep.github.io/ecommerce-api/product/all.json";*/"https://gabysal99.github.io/Productos/productos.json";
const PRODUCT_INFO_URL = /*"https://japdevdep.github.io/ecommerce-api/product/5678.json";*/"https://gabysal99.github.io/Descripcionvehiculos/Descripciones.json";
const PRODUCT_INFO_COMMENTS_URL = "https://japdevdep.github.io/ecommerce-api/product/5678-comments.json";
const CART_INFO_URL = "https://japdevdep.github.io/ecommerce-api/cart/654.json"; //"https://japdevdep.github.io/ecommerce-api/cart/987.json";
const CART_BUY_URL = "https://japdevdep.github.io/ecommerce-api/cart/buy.json";

var showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
}

var hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
}

var getJSONData = function(url){
    var result = {};
    showSpinner();
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          hideSpinner();
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        hideSpinner();
        return result;
    });
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

document.addEventListener("DOMContentLoaded", function(e){
  let usuarioLogueado = localStorage.getItem('UsuarioLogueado')
  let usuario = document.getElementById('nombre')

  if (usuarioLogueado) {
    usuarioLogueado = JSON.parse(usuarioLogueado);

    usuario.innerText = usuario.innerText + 'Usuario Logueado: ' + usuarioLogueado.usuario
  }
  if (document.getElementById('cerrarsesion')) {
    document.getElementById('cerrarsesion').addEventListener("click", function() {
      localStorage.removeItem('usuarioLogueado');
      window.location = 'index.html';
    })
  }
});