document.addEventListener("DOMContentLoaded", function(){
    document.getElementById("autos").addEventListener("click", function() {
        localStorage.setItem("catID", 101);
        window.location = "products.html"
    });
    document.getElementById("juguetes").addEventListener("click", function() {
        localStorage.setItem("catID", 102);
        window.location = "products.html"
    });
    document.getElementById("muebles").addEventListener("click", function() {
        localStorage.setItem("catID", 103);
        window.location = "products.html"
    });
});

function mostrarUsuario(){
    let etiquetaUsuario = localStorage.getItem("usuario");
    console.log(etiquetaUsuario)
    document.getElementById("mostrar-usuario").innerHTML = `<p>` + etiquetaUsuario + `</p>`
}

mostrarUsuario()