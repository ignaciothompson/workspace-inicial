let Producto = {};
let comentariosArray = [];

document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCT_INFO_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            Producto = resultObj.data
            showProduct();
            showImages();
        }
    })
});

function showProduct(){
    let htmlContentToAppend = ""; 
        
    htmlContentToAppend =`
        <div id="muestra-prod">
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

        htmlContentToAppend +=`
        <img src="`+img+`" width="350" height="250" class="galeria">
        `
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
