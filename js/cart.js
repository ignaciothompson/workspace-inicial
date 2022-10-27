let productosArray = [];
let valorSubtotal = 0 ;
let valorEnvio = 0;
let valorTotal = 0;
let premium = document.getElementById("premium");
let standard = document.getElementById("standard");
let express = document.getElementById("express");


document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(CART_INFO_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            productosArray.push(resultObj.data) //funciona cambiar la logica del for
            GenerarTabla()
            calcularSubtotalInicial()
            calcularCostoTotal()
            document.getElementById("cantidad").addEventListener('click',function(){
                calcularSubtotal()
                calcularCostoEnvio()
                calcularCostoTotal()
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
            <td id="subtotal">`+"USD"+" "+producto.unitCost+`</td>
        </tr>
        `
    }
    document.getElementById("tabla-productos").innerHTML = htmlContentToAppend;
}
//calculo del subtotal dependiendo de la cantidad de productos
function calcularSubtotal(){
    let htmlContentToAppend = "";
    for (let i = 0;i < productosArray.length; i++){
        let subtotal = productosArray[i].articles[i]
        htmlContentToAppend +=
        document.getElementById("cantidad").value * subtotal.unitCost 
        
    }
    document.getElementById("subtotal").innerHTML = "USD" +" "+ htmlContentToAppend
    document.getElementById("costos-subtotal").innerHTML = "USD" +" "+ htmlContentToAppend
}
// calculo del subtotal inicial
function calcularSubtotalInicial(){
    for (let i = 0;i < productosArray.length; i++){
        let costos = productosArray[i].articles[i]
        valorSubtotal += costos.unitCost
    }
    document.getElementById("costos-subtotal").innerHTML = "USD" +" "+ valorSubtotal
}
//Funcion para actualizar el costo del envio dependiendo de la cantidad de productos
function calcularCostoEnvio(){
    if(premium.checked){
        console.log(valorSubtotal)
        valorEnvio = ((document.getElementById("cantidad").value * valorSubtotal)*15)/100
        document.getElementById("costos-envio").innerHTML = "USD" +" "+ valorEnvio
    }else if(express.checked){
        console.log(valorSubtotal)
        valorEnvio = ((document.getElementById("cantidad").value * valorSubtotal)*7)/100
        document.getElementById("costos-envio").innerHTML = "USD" +" "+ valorEnvio
    }else if(standard.checked){
        console.log(valorSubtotal)
        valorEnvio = ((document.getElementById("cantidad").value * valorSubtotal)*5)/100
        document.getElementById("costos-envio").innerHTML = "USD" +" "+ valorEnvio
    }
}
//Funciones para que cuando seleccione el tipo de envio se calcule
premium.addEventListener('click', function(e){
    if(premium.checked){
        valorEnvio = ((document.getElementById("cantidad").value * valorSubtotal)*15)/100
        document.getElementById("costos-envio").innerHTML = "USD" +" "+ valorEnvio
        calcularCostoTotal()
    }
})

express.addEventListener('click', function(e){
    if(express.checked){
        valorEnvio = ((document.getElementById("cantidad").value * valorSubtotal)*7)/100
        document.getElementById("costos-envio").innerHTML = "USD" +" "+ valorEnvio
        calcularCostoTotal()
    }
})

standard.addEventListener('click', function(e){
    if(standard.checked){
        valorEnvio = ((document.getElementById("cantidad").value * valorSubtotal)*5)/100
        document.getElementById("costos-envio").innerHTML = "USD" +" "+ valorEnvio
        calcularCostoTotal()
    }
})
//calculo costos totales
function calcularCostoTotal(){
    valorTotal = (document.getElementById("cantidad").value * valorSubtotal) + valorEnvio
    document.getElementById("costos-total").innerHTML = "USD" +" "+ valorTotal
}
//validaciones
document.getElementById("finalizar-compra").addEventListener('click', function(e){
    let calle = document.getElementById("calle").value;
    let numero = document.getElementById("numero").value;
    let esquina = document.getElementById("esquina").value;
    let tarjeta = document.getElementById("tarjeta").checked;
    let numeroTarjeta = document.getElementById("numero-tarjeta").value;
    let cvv = document.getElementById("cvv").value;
    let vencimiento = document.getElementById("vencimiento").value;
    let transferencia = document.getElementById("transferencia").checked;
    let numeroCuenta = document.getElementById("numero-cuenta").value;

    if(premium.checked || express.checked || standard.checked){
        document.getElementById("texto-error-envio").style.opacity = 0;
        if(calle != "" && numero != "" && esquina != ""){
            errorDireccionInverso()
            if(tarjeta){
                if((numeroTarjeta != "" && cvv != "" && vencimiento != "")){
                    alert("Compra exitosa!")
                    document.getElementById("error-metodo-de-pago").style.opacity = 1;
                }
            }else if(transferencia){
                if(numeroCuenta != ""){
                alert("Compra exitosa!")
                document.getElementById("error-metodo-de-pago").style.opacity = 1;
                }
            }else{
                document.getElementById("error-metodo-de-pago").style.opacity = 1;
                e.preventDefault()
            }
        }else{
            errorDireccion()
            e.preventDefault()
        }
    }else{
        document.getElementById("error-envio").style.display = "block";
        document.getElementById("texto-error-envio").style.opacity = 1;
        document.getElementById("error-metodo-de-pago").style.opacity = 1;
        errorDireccion()
        e.preventDefault()
    }
})

function errorDireccion(){
    let errorTexto = document.getElementsByClassName("texto-error-carrito");
    for (i=0; i<errorTexto.length;i++){
        errorTexto[i].style.opacity = 1 ;
    }
}
function errorDireccionInverso(){
    let errorTexto = document.getElementsByClassName("texto-error-carrito");
    for (i=0; i<errorTexto.length;i++){
        errorTexto[i].style.opacity = 0 ;
    }
}