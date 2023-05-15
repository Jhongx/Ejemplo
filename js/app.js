//variables de tipo const

const carrito = document.querySelector("#carrito");
const contenedorCarrito = document.querySelector("#lista-carrito tbody");
const listaCursos = document.querySelector("#lista-cursos");
const vaciarCarritoBtn = document.querySelector("#vaciar-carrito");
let articulosCarrito = [];
rellenarCarrito();

//funcion de rellenar carrito
function estadistica(){
    console.log("hola")
}
function rellenarCarrito() {
    if (localStorage.length > 0) {
        const listaObjetosRecuperada = JSON.parse(
            localStorage.getItem("listaObjetos")
        );
        articulosCarrito = listaObjetosRecuperada;
        carritoHTML();
    }
}

//listener y metodos(funciones)
cargarEventListener();
function cargarEventListener() {
    //cuando se hace click sobre el boton "Agregar al carrito" agregamos un curso
    listaCursos.addEventListener("click", agregarCurso);
    //Escucha para ejecutar un evento para eliminar un elemento del carrito
    carrito.addEventListener("click", eliminarCurso);
    vaciarCarritoBtn.addEventListener("click", () => {
        articulosCarrito = [];
    });
}

//funcion para eliminar un curso
function eliminarCurso(e) {
    if (e.target.classList.contains("borrar-curso")) {
        const cursoId = e.target.getAttribute("data-id");
        articulosCarrito = articulosCarrito.filter(
            (curso) => curso.id !== cursoId
        );
        const listaArticulo = JSON.stringify(articulosCarrito);

        // Almacenar la cadena JSON en localStorage
        localStorage.setItem("listaObjetos", listaArticulo);
    }

    carritoHTML();
}

//funciones
function agregarCurso(e) {
    e.preventDefault();
    if (e.target.classList.contains("agregar-carrito")) {
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado);
        //console.log('Agregando al carrito');
    }
}
//lee el contenido del HTML del card que le dimos click y extraemos la informacion del curso

function leerDatosCurso(cursoSeleccionado) {
    const infoCurso = {
        imagen: cursoSeleccionado.querySelector("img").src,
        titulo: cursoSeleccionado.querySelector("h4").textContent,
        precio: cursoSeleccionado.querySelector(".precio span").textContent,
        id: cursoSeleccionado.querySelector("a").getAttribute("data-id"),
        cantidad: 1,
    };

    //revisar si un elemento ya existe en el carrito
    const existe = articulosCarrito.some((curso) => curso.id === infoCurso.id);
    if (existe) {
        //actualizar la cantidad del articulo que se encuentra en el carrito
        const cursos = articulosCarrito.map((curso) => {
            if (curso.id === infoCurso.id) {
                curso.cantidad++;
                return curso; //retorna el objeto actualizado
            } else {
                return curso; //retorna los objetos que no están duplicados
            }
        });
        articulosCarrito = [...cursos];
    } else {
        articulosCarrito = [...articulosCarrito, infoCurso];
    }
    // Convertir la lista de objetos a una cadena JSON
    const listaArticulo = JSON.stringify(articulosCarrito);

    // Almacenar la cadena JSON en localStorage
    localStorage.setItem("listaObjetos", listaArticulo);

    console.log(articulosCarrito);
    carritoHTML();
}

function carritoHTML() {
    limpiarHTML();
    articulosCarrito.forEach((curso) => {
        const { imagen, titulo, precio, cantidad, id } = curso;
        const row = document.createElement("tr");
        row.innerHTML = `
        <td>
          <img src="${curso.imagen}" width="100">
        </td>
        <td>${curso.titulo}</td>
        <td>${curso.precio}</td>
        <td>${curso.cantidad}</td>
        <td>
          <a href="#" class="borrar-curso" data-id="${curso.id}">X</a> X </a>
        </td>
      `;
        contenedorCarrito.appendChild(row);
    });
}

function limpiarHTML() {
    while (contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}
