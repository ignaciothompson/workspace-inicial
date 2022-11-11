let Producto = {};
let comentariosArray = [];
let objeto = {
    "id": null,
    "name": "",
    "count": null,
    "unitCost": null,
    "currency": "",
    "image": ""
}
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCT_INFO_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            Producto = resultObj.data
            showProduct();
            showImages();
            showRelatedProducts();
            console.log(Producto)
        }
    })
});

function showProduct(){
    let htmlContentToAppend = ""; 
        
    htmlContentToAppend =`
        <div class="muestra-prod">
            <h2>` + Producto.name + `</h2>
            <hr>
            <p><b>`+ "Precio" +`</b></p>
            <p>`+ Producto.cost +`</p>
            <p><b>`+ "Descripción" +`</b></p>
            <p>`+ Producto.description +`</p>
            <p><b>`+ "Categoría" +`</b></p>
            <p>`+ Producto.category +`</p>
            <p><b>`+ "Cantidad de vendidos" +`</b></p>
            <p>`+ Producto.soldCount+`</p>
        </div>
        `
        document.getElementById('info-prod').innerHTML = htmlContentToAppend;
    
}

function showImages(){
    let htmlContentToAppend = ""; 
    for(let i=0; i<Producto.images.length;i++){
        let img = Producto.images[i];
        if(i===0){
            htmlContentToAppend +=`
            <div class="carousel-item active">
            <img src="`+img+`"class="d-block w 75">
            </div>
            `
        }else{
            htmlContentToAppend +=`
            <div class="carousel-item">
            <img src="`+img+`"class="d-block w 75">
            </div>
            `
        }
    }
    document.getElementById('images-prod').innerHTML = htmlContentToAppend;
}

document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            comentariosArray = resultObj.data
            showComments()
        }
    })
});

function showComments(){
    let htmlContentToAppend = ""; 
    for(let i=0; i<comentariosArray.length;i++){
        let comentarios = comentariosArray[i];
        
        htmlContentToAppend +=`
        <div class="comment-box">
        <p class="comment"><b>`+ comentarios.user + `</b>`+ " " + comentarios.dateTime + `</p>
        <p class="comment">`+ comentarios.description +`</p>   
        </div>
        `
        for(let i=0; i<5; i++){
            if(i<comentarios.score){
                htmlContentToAppend +=`
                <span class="fa fa-star checked"></span>
                `
            }else{
                htmlContentToAppend +=`
                <span class="fa fa-star "></span>
                `
            }
        }
        document.getElementById('comments-prod').innerHTML = htmlContentToAppend;
    }

}

function showRelatedProducts(){
    let htmlContentToAppend = ""; 
    for(let i=0; i<Producto.relatedProducts.length;i++){
        let producto = Producto.relatedProducts[i];

        htmlContentToAppend +=`
            <div class="card" style="width: 18rem;" onclick="setProductID(${producto.id})">
                <img src="`+producto.image+`" class="card-img-top">
                <div class="card-body">
                    <p class="card-text">`+producto.name+`</p>
                </div>
            </div>
            `
    }
    document.getElementById('related-products').innerHTML = htmlContentToAppend;
}

function setProductID(id) {
    localStorage.setItem("prodID", id);
    window.location = "product-info.html"
}

document.getElementById("agregar-carrito").addEventListener('click',function(agregar){
    agregar.preventDefault();
    let objetoProducto = Object.create(objeto);
    objetoProducto.id = Producto.id;
    objetoProducto.name = Producto.name;
    objetoProducto.count = 1;
    objetoProducto.unitCost = Producto.cost;
    objetoProducto.currency = Producto.currency;
    objetoProducto.image = Producto.images[0];
    localStorage.setItem("objetoProducto",JSON.stringify(objetoProducto));
    window.location = "cart.html";
})
