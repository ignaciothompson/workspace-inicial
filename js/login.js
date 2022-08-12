//constantes referenciando objetos en el html
const loginForm = document.getElementById("login-form");
const loginButton = document.getElementById("login-form-submit");
const loginError = document.getElementById('login-error-msg');
const correctLogin = document.getElementById("correct-login0");
//funcion para la validacion del formulario y la redireccion a otra pagina
loginButton.addEventListener("click", (logeo) =>{
    logeo.preventDefault();
    var usuario = loginForm.username.value;
    var contraseña = loginForm.password.value;

    if (usuario && contraseña.length>=6){
        //alert("Se a ingresado de forma correcta");
        window.location.href = "index.html";
    } else{
        loginError.style.opacity = 1;
    }
})