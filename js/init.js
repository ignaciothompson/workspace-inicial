const CATEGORIES_URL = "https://japceibal.github.io/emercado-api/cats/cat.json";
const PUBLISH_PRODUCT_URL = "https://japceibal.github.io/emercado-api/sell/publish.json";
const PRODUCTS_URL = `https://japceibal.github.io/emercado-api/cats_products/${localStorage.getItem("catID")}.json`;
const PRODUCT_INFO_URL = `https://japceibal.github.io/emercado-api/products/${localStorage.getItem("prodID")}.json`;
const PRODUCT_INFO_COMMENTS_URL = `https://japceibal.github.io/emercado-api/products_comments/${localStorage.getItem("prodID")}.json`;
const CART_INFO_URL = "https://japceibal.github.io/emercado-api/user_cart/25801.json";
const CART_BUY_URL = "https://japceibal.github.io/emercado-api/cart/buy.json";
const EXT_TYPE = ".json";


let showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
}

let hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
}
//Toma los datos del Json y los convierte en un objeto
let getJSONData = function(url){
    let result = {};
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
//funcion para mostrar el usuario en la part e superior de la pagina
function mostrarUsuario(){
  let etiquetaUsuario = localStorage.getItem("usuario");
  document.getElementById("mostrar-usuario").innerHTML =`
      <div class="dropdown">
      <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
        `+ etiquetaUsuario +`
      </button>
      <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
        <li><a class="dropdown-item" href="#" id="carrito-click">`+"Mi Carrito"+`</a></li>
        <li><a class="dropdown-item" href="#" id="perfil-click">`+"Mi Perfil"+`</a></li>
        <li><a class="dropdown-item" href="#" id="sesion-click">`+"Cerrar Sesion"+`</a></li>
      </ul>
    </div>
    `
}
mostrarUsuario();

document.getElementById("carrito-click").addEventListener("click", function(e){
  window.location = "cart.html";
})

document.getElementById("perfil-click").addEventListener("click", function(e){
  window.location = "my-profile.html";
})

document.getElementById("sesion-click").addEventListener("click", function(e){
  localStorage.clear("usuario");
  window.location = "index.html";
})