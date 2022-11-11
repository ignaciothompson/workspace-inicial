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
(() => {
    'use strict'
  

    const forms = document.querySelectorAll('.needs-validation')
    console.log(forms)
    
    Array.from(forms).forEach(form => {
      form.addEventListener('submit', event => {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }else{
            alert("La compra a sido exitosa")
        }
  
        form.classList.add('was-validated')
      }, false)
    })
})()

function pagoTarjeta(){
    if(document.getElementById("tarjeta").checked === true){
        document.getElementById("transferencia").disabled = true;
        document.getElementById("numero-cuenta").disabled = true;
    }else{
        document.getElementById("transferencia").disabled = false;
        document.getElementById("numero-cuenta").disabled = false;
    }
}

function pagoTransferencia(){
    if(document.getElementById("transferencia").checked === true){
        document.getElementById("tarjeta").disabled = true;
        document.getElementById("numero-tarjeta").disabled = true;
        document.getElementById("cvv").disabled = true;
        document.getElementById("vencimiento").disabled = true;
    }else{
        document.getElementById("tarjeta").disabled = false;
        document.getElementById("numero-tarjeta").disabled = false;
        document.getElementById("cvv").disabled = false;
        document.getElementById("vencimiento").disabled = false;
    }
}
