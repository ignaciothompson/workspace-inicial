let objeto ={
    primerNombre : "",
    segundoNombre : "",
    primerApellido : "",
    segundoApellido : "",
    email : "",
    telefono : null,
}


document.getElementById("guardar-cambios").addEventListener('click', function(submit){
    submit.preventDefault();
    let primerNombre = document.getElementById("primer-nombre").value;
    let segundoNombre = document.getElementById("segundo-nombre").value;
    let primerApellido = document.getElementById("primer-apellido").value;
    let segundoApellido = document.getElementById("segundo-apellido").value;
    let email = document.getElementById("email-perfil").value;
    let telefono = document.getElementById("telefono-contacto").value;
    objeto.primerNombre = primerNombre;
    objeto.segundoNombre = segundoNombre;
    objeto.primerApellido = primerApellido;
    objeto.segundoApellido = segundoApellido;
    objeto.email = email;
    objeto.telefono = telefono;
    localStorage.setItem("perfil",JSON.stringify(objeto));
})

if (localStorage.usuario!==undefined){
    document.getElementById("email-perfil").value = localStorage.usuario
};

if (localStorage.perfil!==undefined){
    objeto = JSON.parse(localStorage.perfil)
    document.getElementById("primer-nombre").value = objeto.primerNombre;
    document.getElementById("segundo-nombre").value = objeto.segundoNombre;
    document.getElementById("primer-apellido").value  = objeto.primerApellido;
    document.getElementById("segundo-apellido").value = objeto.segundoApellido;
    document.getElementById("email-perfil").value = objeto.email;
    document.getElementById("telefono-contacto").value = objeto.telefono;
    console.log(JSON.parse(localStorage.perfil))
};

(() => {
    'use strict'
    
    const forms = document.querySelectorAll('.needs-validation')
    
    Array.from(forms).forEach(form => {
        form.addEventListener('submit', event => {
        if (!form.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
        }
        form.classList.add('was-validated')
        }, false)
    })
})()

