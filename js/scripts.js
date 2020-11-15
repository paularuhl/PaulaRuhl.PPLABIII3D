import crearTabla from "./tabla.js";
import Anuncio_Auto from "./anuncio_auto.js";

let listaAutomoviles = [];
let proximoId;
let divTabla;
let frmAutomovil;

window.addEventListener('load', inicializarManejadores);


const btnGuardar = document.getElementById("btnGuardar");

const btnModificar = document.getElementById("btnModificar");

const btnEliminar = document.getElementById("btnEliminar");



let listaAnuncios = [{
    "id": 1,
    "titulo": "GMC",
    "transaccion": "alquiler",
    "descripcion": "Savana 3500",
    "precio": 5940092,
    "num_puertas": 4,
    "num_KMs": 80352,
    "potencia": 6112
}, {
    "id": 2,
    "titulo": "Ford",
    "transaccion": "alquiler",
    "descripcion": "Econoline E250",
    "precio": 5107498,
    "num_puertas": 3,
    "num_KMs": 54836,
    "potencia": 6767
}, {
    "id": 3,
    "titulo": "GMC",
    "transaccion": "venta",
    "descripcion": "Savana",
    "precio": 9651916,
    "num_puertas": 2,
    "num_KMs": 64607,
    "potencia": 7271
}, {
    "id": 4,
    "titulo": "Mercedes-Benz",
    "transaccion": "venta",
    "descripcion": "SL-Class",
    "precio": 3975066,
    "num_puertas": 3,
    "num_KMs": 52438,
    "potencia": 12830
}, {
    "id": 5,
    "titulo": "Mitsubishi",
    "transaccion": "alquiler",
    "descripcion": "Raider",
    "precio": 7346993,
    "num_puertas": 5,
    "num_KMs": 30479,
    "potencia": 18577
}];


function inicializarManejadores() {
    localStorage.setItem("anuncios", JSON.stringify(listaAnuncios));

    listaAutomoviles = obtenerAutomoviles();

    divTabla = document.getElementById('divTabla');
    frmAutomovil = document.forms[0];
    if (listaAutomoviles) {
        actualizarLista();
    }
    frmAutomovil.addEventListener('submit', e => {
        e.preventDefault();
        altaAutomovil();
    });
}

function obtenerAutomoviles() {
    return JSON.parse(localStorage.getItem('anuncios')) || [];
}

function altaAutomovil() {
    listaAutomoviles = obtenerAutomoviles();
    proximoId = obtenerId();
    const nuevoAuto = obtenerAutomovil(proximoId);
    if (nuevoAuto) {
        listaAutomoviles.push(nuevoAuto);
        proximoId++;
        guardarDatos();
        actualizarLista();
    }
}

function obtenerAutomovil(proximoId) {
    const nuevoAnuncioAuto = new Anuncio_Auto(
        proximoId,
        document.getElementById('txtTitulo').value,
        frmAutomovil.transaction.value,
        document.getElementById('txtDescripcion').value,
        document.getElementById('txtPrecio').value,
        document.getElementById('txtPuertas').value,
        document.getElementById('txtKMs').value,
        document.getElementById('txtPotencia').value,
    );
    return nuevoAnuncioAuto;
}


function obtenerId() {
    return JSON.parse(localStorage.getItem('nextId')) || 1000;
}

function guardarDatos() {
    localStorage.setItem('anuncios', JSON.stringify(listaAutomoviles));
    localStorage.setItem('nextId', proximoId);
}

function actualizarLista() {

    divTabla.innerHTML = "";
    let spinner = document.createElement("img");
    spinner.src = "./img/739.gif";
    divTabla.appendChild(spinner);
    setTimeout(() => {
        divTabla.removeChild(spinner);
        divTabla.appendChild(crearTabla(listaAutomoviles));
    }, 5000);
}


btnGuardar.addEventListener('click', function (e) {

    const camposCompletos = document.getElementById('myForm').checkValidity();

    e.preventDefault();

    if (camposCompletos) {
        const nuevoAnuncio = altaAnuncio();

        listaAutomoviles.push(nuevoAnuncio);

        const divTabla = document.getElementById('divTabla');

        divTabla.removeChild(divTabla.lastChild);

        divTabla.appendChild(crearTabla(listaAutomoviles));

        localStorage.setItem("anuncios", JSON.stringify(listaAutomoviles));

    }

    cleanInfo();
});


btnModificar.addEventListener('click', function (e) {


    e.preventDefault();
    const selectedId = document.getElementById("txtID").value;

    listaAutomoviles.forEach(element => {
        if (element.id == selectedId) {
            const titulo = document.getElementById("txtTitulo").value;
            const descripcion = document.getElementById("txtDescripcion").value;
            const precio = document.getElementById("txtPrecio").value;
            const puertas = document.getElementById("txtPuertas").value;
            const KM = document.getElementById("txtKMs").value;
            const potencia = document.getElementById("txtPotencia").value;

            element['titulo'] = titulo;
            element['descripcion'] = descripcion;
            element['precio'] = precio;
            element['num_puertas'] = puertas;
            element['num_KMs'] = KM;
            element['potencia'] = potencia;


            if (frmAutomovil.transaction.value = "rdoS") {
                element['transaccion'] = "venta";
            } else {
                element['transaccion'] = "alquiler";
            }

            if (confirm("Realmente desea modificar el item?")) {
                localStorage.setItem("anuncios", JSON.stringify(listaAutomoviles));
                divTabla.removeChild(divTabla.lastChild);

                divTabla.appendChild(crearTabla(listaAutomoviles));

                cleanInfo();

            }

        }
    });
});


btnEliminar.addEventListener('click', function (e) {

    e.preventDefault();
    const selectedId = document.getElementById("txtID").value;

    listaAutomoviles.forEach(element => {

        if (element.id == selectedId) {
            const index = listaAutomoviles.indexOf(element);

            if (confirm("Seguro que desea eliminar el anuncio?")) {
                listaAutomoviles.splice(index, 1);

                localStorage.setItem("anuncios", JSON.stringify(listaAutomoviles));

                divTabla.removeChild(divTabla.lastChild);

                divTabla.appendChild(crearTabla(listaAutomoviles));
                cleanInfo();
            }
        }
    });
});


function cleanInfo() {

    document.getElementById("txtTitulo").value = "";
    document.getElementById("txtDescripcion").value = "";
    document.getElementById("txtPrecio").value = "";
    document.getElementById("txtPuertas").value = "";
    document.getElementById("txtKMs").value = "";
    document.getElementById("txtPotencia").value = "";
    document.getElementById("txtID").value = "";
   
    btnGuardar.disabled = false;
    btnModificar.disabled = true;
    btnEliminar.disabled = true;

}