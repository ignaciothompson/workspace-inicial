
let categoriesArray = [];
//Esta funcion toma el array obtenido en la funcion document.addEventListener() y lo muestra en el HTML
function mostrarProductos(array){
    let htmlContentToAppend = "";
    for(let i = 0; i < array.products.length; i++){ 
        let category = array.products[i];
        htmlContentToAppend += `
        <div class="list-group-item list-group-item-action">
            <div class="row">
                <div class="col-3">
                    <img src="` + category.image + `" alt="product image" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <div class="mb-1">
                        <h4>`+ category.name + " - " + category.currency + " " + category.cost +`</h4> 
                        <p> `+ category.description +`</p> 
                        </div>
                        <small class="text-muted">` + category.soldCount + ` artículos</small> 
                    </div>

                </div>
            </div>
        </div>
        `
        document.getElementById("info-productos").innerHTML = htmlContentToAppend; 
    }
}


//Ejecuta la funcion getJSONData en init.js y toma los datos del Json los cuales guarda en la variable categoriesArray
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(AUTOS_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            categoriesArray = resultObj.data;
            mostrarProductos(categoriesArray);
        }
    });
});

function mostrarUsuario(){
    let etiquetaUsuario = localStorage.getItem("usuario");
    console.log(etiquetaUsuario)
    document.getElementById("mostrar-usuario").innerHTML = `<p>` + etiquetaUsuario + `</p>`
}

mostrarUsuario()