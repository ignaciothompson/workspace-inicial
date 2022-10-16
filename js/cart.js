let productosArray = [];


document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(CART_INFO_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            productosArray.push(resultObj.data) //funciona cambiar la logica del for
            GenerarTabla()
            document.getElementById("cantidad").addEventListener('click',function(){
                calcularSubtotal()
            })
            console.log(productosArray)
        }
    })
});

function GenerarTabla(){
    let htmlContentToAppend = "";
    for (let i = 0;i < productosArray.length; i++){
        let producto = productosArray[i].articles[i]
        htmlContentToAppend +=`
        <tr>
            <td><img src="`+producto.image+`" width="100" heigth="100"></td>
            <td>`+producto.name+`</td>
            <td>`+producto.currency + " " +producto.unitCost+`</td>
            <td>
            <form><input type="number" id="cantidad" value="`+producto.count+`" style="max-width:50px;"></form>
            </td>
            <td id="subtotal">`+producto.unitCost+`</td>
        </tr>
        `
    }
    document.getElementById("tabla-productos").innerHTML = htmlContentToAppend;
}

function calcularSubtotal(){
    let htmlContentToAppend = "";
    for (let i = 0;i < productosArray.length; i++){
        let subtotal = productosArray[i].articles[i]
        htmlContentToAppend +=
        document.getElementById("cantidad").value * subtotal.unitCost
    }
    document.getElementById("subtotal").innerHTML = htmlContentToAppend
}



