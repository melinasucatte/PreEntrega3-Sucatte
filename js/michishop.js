let productosMichi =[];

fetch("./js/productos.json")
    .then(response => response.json())
    .then(data => {
        productosMichi = data;
        agregarProductos(productosMichi);
    })

const contenedorProductos= document.querySelector("#contenedor-productos");
const categoriaProductos= document.querySelectorAll(".boton-productos");
const tituloPrincipal= document.querySelector("#titulo-principal");
let botonAgregar=document.querySelectorAll(".producto-agregar");
const numeroCarrito=document.querySelector("#numero");

//AGREGAR PRODUCTOS DE COMPRA
function agregarProductos(productosElegidos){

    contenedorProductos.innerHTML = "";

    productosElegidos.forEach(producto => { 
            const div= document.createElement("div");
            div.classList.add("productos");
            div.innerHTML= ` 
            <img class="producto-imagen" src="${producto.img}" alt="${producto.producto}">
            <div class="producto-detalles">
                <h3 class="producto-titulo">${producto.producto}</h3>
                <p class="producto-precio">$${producto.precio}</p>
                <button class="producto-agregar" id="${producto.id}">Agregar al carrito</button>
            </div>`;

            contenedorProductos.append(div);
        })
        
        actualizarBotonesAgregar();
}

 
//FILTRO PRODUCTOS
categoriaProductos.forEach( boton => {
    boton.addEventListener("click", (e) => {

        categoriaProductos.forEach(boton => boton.classList.remove("active"));

        e.currentTarget.classList.add("active")

        if(e.currentTarget.id != "todos"){
            const productoFiltro= productosMichi.find(producto => producto.categoria.id ===e.currentTarget.id);
            tituloPrincipal.innerHTML=productoFiltro.categoria.nombre;
            const filtro = productosMichi.filter( producto => producto.categoria.id === e.currentTarget.id);
            agregarProductos(filtro);
        }else{
            tituloPrincipal.innerHTML="TODOS LOS PRODUCTOS";
            agregarProductos(productosMichi); 
        }
    })
});

//AGREGAR AL CARRITO

function actualizarBotonesAgregar(){

    botonAgregar=document.querySelectorAll(".producto-agregar");

    botonAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
    })
}

//AGREGAR MAS PRODUCTOS EN EL CARRITO

let productosCarrito;
let productosCarritoMS= localStorage.getItem("productos-carrito");
if(productosCarritoMS){
    productosCarrito = JSON.parse(productosCarritoMS);
    actualizarNumeroCarrito();

}else{
    productosCarrito = [];
}


//AGREGAR PRODUCTOS AL CARRITO

function agregarAlCarrito(evento){

    Toastify({
        text: "Agregado al carrito",
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

    const idBoton = evento.currentTarget.id;
    const productoAgregar = productosMichi.find((producto) => producto.id === idBoton);

    if(productosCarrito.some(producto => producto.id === idBoton)){
        const index = productosCarrito.findIndex(producto => producto.id === idBoton);
        productosCarrito[index].cantidad++;
    }else{
        productoAgregar.cantidad=1;
        productosCarrito.push(productoAgregar);
    }
    actualizarNumeroCarrito();

    localStorage.setItem("productos-carrito", JSON.stringify(productosCarrito));
}

//NUMERO CARRITO

function actualizarNumeroCarrito(){
    let num = productosCarrito.reduce( (acc, producto) => acc + producto.cantidad, 0);
    numeroCarrito.innerHTML= num;
}