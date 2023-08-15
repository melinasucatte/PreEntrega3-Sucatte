//capturamos el formulario 
const inicioForm= document.getElementById("inicio");

//Funcion para mostrar errores en el formulario
const mostrarMensaje=(title, text, type) => {
    Swal.fire(title, text, type);
};

//Agregamos el evento submit
inicioForm.addEventListener("submit", (evento)=> {
    //prevenimos que se recargue la pagina
    evento.preventDefault();
    //capturamos el input nombre
    const nombre = document.getElementById("nombre").value;
    const pass= document.getElementById("contrasenia").value;
    //peticion de usuarios
    fetch("./js/usuarios.json")
        .then((response)=> response.json())
        .then((users) => {
            const user = users.find((user)=> user.nombre == nombre);
            if (user){
                if(pass === user.contrasenia){
                    mostrarMensaje(`HOLA ${user.nombre} BIENVENIDO A MICHI SHOP PUEDE REALIZAR SU COMPRA`,"REDIRECCIONANDO...","success")
                    setTimeout(() => {
                        location.href="./index.html";
                    }, 1500);
                }else{
                    mostrarMensaje("ERROR AL INICIAR SESION", "CONTRASEÑA INCORRECTA","error");}
            }else {
                mostrarMensaje("ERROR AL INICIAR SESION","NOMBRE INCORRECTO","error");
            }
        });

});