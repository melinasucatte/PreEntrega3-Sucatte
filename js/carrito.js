const productoCarrito =JSON.parse(localStorage.getItem("productos-carrito"));
const carritoVacio= document.querySelector("#carrito-vacio");
const carritoLleno= document.querySelector("#carrito-lleno");
const carritoAcciones= document.querySelector("#carrito-acciones");
const carritoFinal= document.querySelector("#carrito-final");
let botonEliminar = document.querySelectorAll(".carrito-eliminar");
const botonVaciar= document.querySelector("#carrito-vaciar");
const totalCarrito= document.querySelector("#total");
const botonComprar= document.querySelector("#carrito-comprar");

//CARGAR PRODUCTOS AL CARRITO
function cargarProductosEnCarrito(){
    if(productoCarrito && productoCarrito.length > 0){
        carritoVacio.classList.add("ocultar");
        carritoLleno.classList.remove("ocultar");
        carritoAcciones.classList.remove("ocultar");
        carritoFinal.classList.add("ocultar");

        carritoLleno.innerHTML = "";
        
        productoCarrito.forEach(producto => {
            const div = document.createElement("div");
            div.classList.add("carrito-prooductos");
            div.innerHTML= ` 
            <div class="carrito-producto">
            <img src="${producto.img}" alt="${producto.producto}" class="carrito-imagen">
            <div class="carrito-titulo">
                <small>${producto.categoria.nombre}</small>
                <h3>${producto.producto}</h3>
            </div>
            <div class="carrito-cantidad">
                <small>CANTIDAD</small>
                <p>${producto.cantidad}</p>
            </div>
            <div class="carrito-precio">
                <small>PRECIO</small>
                <p>$${producto.precio}</p>
            </div>
            <div class="carrito-subtotal">
                <small>SUBTOTAL</small>
                <p>$${producto.precio * producto.cantidad}</p>
            </div>
            <button class="carrito-eliminar" id="${producto.id}"><i class="bi bi-trash"></i></button>
        </div>`;

        carritoLleno.append(div);
        });

    }else{
        carritoVacio.classList.remove("ocultar");
        carritoLleno.classList.add("ocultar");
        carritoAcciones.classList.add("ocultar");
        carritoFinal.classList.add("ocultar");
    }
    
    actualizarBotonesEliminar();
    total();
}

cargarProductosEnCarrito();


//BOTONES ELIMINAR PRODUCTO

function actualizarBotonesEliminar(){

    botonEliminar=document.querySelectorAll(".carrito-eliminar");

    botonEliminar.forEach(boton => {
        boton.addEventListener("click", eliminarDelCarrito);
    })
}

function eliminarDelCarrito(evento){
    Toastify({
        text: "Producto Eliminado",
        duration: 3000,
        close: true,
        gravity: "bottom", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "linear-gradient(to right,  #cf7619, #efb07d)",
          color:"black"
        },
        offset: {
            x: 50, // horizontal axis - can be a number or a string indicating unity. eg: '2em'
            y: 10 // vertical axis - can be a number or a string indicating unity. eg: '2em'
          },
        onClick: function(){} // Callback after click
      }).showToast();

    const idEliminar= evento.currentTarget.id;
    const productoEliminado= productoCarrito.find(producto => producto.id === idEliminar);
    const index = productoCarrito.findIndex(producto => producto.id === idEliminar)
    console.log(productoCarrito);
    productoCarrito.splice(index, 1);
    console.log(productoCarrito);
    cargarProductosEnCarrito();
    localStorage.setItem("productos-carrito", JSON.stringify(productoCarrito));
}

//VACIAR CARRITO
botonVaciar.addEventListener("click", vaciarCarrito);

function vaciarCarrito(){
    swal({
        title: "¿Esta seguro que quiere vaciar su carrito?",
        text: `Se eliminaran ${productoCarrito.reduce((acc, producto) => acc + producto.cantidad,0)} productos`,
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
            productoCarrito.length =0;
            localStorage.setItem("productos-carrito", JSON.stringify(productoCarrito));
            cargarProductosEnCarrito();
        }
      });
}

//TOTAL

function total(){
    const totalCalculado = productoCarrito.reduce((acc, producto) => acc +(producto.precio * producto.cantidad),0);
    totalCarrito.innerText = `$${totalCalculado}`;
}

//BOTON COMPRAR

botonComprar.addEventListener("click", comprarCarrito);

function comprarCarrito(){
    productoCarrito.length =0;
    localStorage.setItem("productos-carrito", JSON.stringify(productoCarrito));
    
    carritoVacio.classList.add("ocultar");
    carritoLleno.classList.add("ocultar");
    carritoAcciones.classList.add("ocultar");
    carritoFinal.classList.remove("ocultar");
}