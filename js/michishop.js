//LISTA DE PRODUCTOS
const productosMichi = [
    {
        id: "alimento seco",
        producto: "Alimento Seco",
        img: "./img/alimento-seco.jpg",
        precio: 10000,
        categoria:{
            nombre: "ALIMENTO",
            id: "alimento",
        },
    },
    {
        id: "alimento humedo",
        producto: "Alimento Humedo",
        img: "./img/alimento-humedo.jpg",
        precio: 500,
        categoria:{
            nombre: "ALIMENTO",
            id: "alimento",
        },
    },
    {
        id: "snack",
        producto: "Snack",
        img: "./img/snack.jpg",
        precio: 200,
        categoria:{
            nombre: "ALIMENTO",
            id: "alimento",
        },
    },
    {
        id: "hierba",
        producto: "Hierba",
        img: "./img/hierba.jpg",
        precio: 150,
        categoria:{
            nombre: "ACCESORIOS",
            id: "accesorios",
        },
    },
    {
        id: "juguete",
        producto: "Juguete",
        img: "./img/juguete.jpg",
        precio: 300,
        categoria:{
            nombre: "ACCESORIOS",
            id: "accesorios",
        },
    },
    {
        id: "rascador",
        producto: "Rascador",
        img: "./img/rascador.jpg",
        precio: 2500,
        categoria:{
            nombre: "ACCESORIOS",
            id: "accesorios",
        },
    },
    {
        id: "chapita",
        producto: "Chapita",
        img: "./img/chapita.jpg",
        precio: 200,
        categoria:{
            nombre: "PASEO",
            id: "paseo",
        },
    },
    {
        id: "trasportadora",
        producto: "Transportadora",
        img: "./img/transportadora.jpg",
        precio: 5500,
        categoria:{
            nombre: "PASEO",
            id: "paseo",
        },
    },
    {
        id: "pretal",
        producto: "Pretal",
        img: "./img/pretal.jpg",
        precio: 1000,
        categoria:{
            nombre: "PASEO",
            id: "paseo",
        },
    },
    {
        id: "collar",
        producto: "Collar",
        img: "./img/collar.jpg",
        precio: 500,
        categoria:{
            nombre: "PASEO",
            id: "paseo",
        },
    },
    {
        id: "comedero",
        producto: "Comedero",
        img: "./img/comedero.jpg",
        precio: 3000,
        categoria:{
            nombre: "ComidaYBebedero",
            id: "comidaybebedero",
        },
    },
    {
        id: "bebedero",
        producto: "Bebedero",
        img: "./img/bebedero.jpg",
        precio: 6000,
        categoria:{
            nombre: "COMEDERO Y BEBEDERO",
            id: "comederoybebedero",
        },
    },
    {
        id: "cama",
        producto: "Cama",
        img: "./img/cama.jpg",
        precio: 3200,
        categoria:{
            nombre: "CAMA",
            id: "cama",
        },
    },
    {
        id: "litera",
        producto: "Litera",
        img: "./img/litera.jpg",
        precio: 3000,
        categoria:{
            nombre: "HIGIENE",
            id: "higiene",
        },
    },
    {
        id: "piedras",
        producto: "Piedras",
        img: "./img/piedras.jpg",
        precio: 500,
        categoria:{
            nombre: "HIGIENE",
            id: "higiene",
        },
    },
    {
        id: "pipeta",
        producto: "Pipeta",
        img: "./img/pipeta.jpg",
        precio: 1500,
        categoria:{
            nombre: "HIGIENE",
            id: "higiene",
        },
    }
];

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

agregarProductos(productosMichi); 
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