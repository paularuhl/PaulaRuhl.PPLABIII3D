import crearTabla from "./tabla.js";
import Anuncio_Auto from "./anuncio_auto.js";

let listaAutomoviles = [];
let proximoId;
let divTabla;
let frmAutomovil; 

window.addEventListener('load', inicializarManejadores);

function inicializarManejadores() {
    divTabla = document.getElementById('divTabla');
    listaAutomoviles = obtenerAutomoviles();
    proximoId = obtenerId();
    frmAutomovil = document.forms[0];

    frmAutomovil.addEventListener('submit', e => {
        e.preventDefault();
        const nuevoAuto = obtenerAutomovil();
        if (nuevoAuto) {
            listaAutomoviles.push(nuevoAuto);
            proximoId++;
            guardarDatos();
            actualizarLista();
        }
    });


}

function obtenerAutomoviles() {

    return JSON.parse(localStorage.getItem('gente')) || [];

}
function obtenerAutomovil() {
    console.log(document);
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
    spinner.src = "739.png";
    divTabla.appendChild(spinner);
    setTimeout(() => {
        divTabla.appendChild(crearTabla(listaAutomoviles));
    }, 5000);
}