import crearTabla from "./tabla.js";
import Anuncio from "./anuncio.js";
import Anuncio_Auto from "./anuncio_auto.js";

const listaAutomoviles = [];
let proximoId;
window.addEventListener('load', inicializarManejadores);

function inicializarManejadores(){

    listaAutomoviles = obtenerAutomoviles();
    proximoId = obtenerId();
    console.log(listaAutomoviles);
    const frmAutomovil = document.forms[0].addEventListener('submit', e =>{
        e.preventDefault();
    });


}

// btnTabla = document.getElementById('btnTabla');

// btnTabla.addEventListener('click', function(e){
//     const divTabla = document.getElementById('divTabla');
//     divTabla.appendChild(crearTabla(listaDePersonas));
// });


function obtenerAutomoviles(){

    return JSON.parse(localStorage.getItem('gente')) || [];
    
}
function altaAutomovil(){
    const nuevoAnuncioAuto = new Anuncio_Auto(
        proximoId,
        document.getElementById('#txtTitulo').value,
        document.transaction.value,
        document.getElementById('#txtDescripcion').value,
        document.getElementById('#txtPrecio').value,
        document.getElementById('#txtPuertas').value,
        document.getElementById('#txtKMs').value,
        document.getElementById('#txtPotencia').value,
    );
    listaAutomoviles.push(nuevoAnuncioAuto);
}


function obtenerId(){
    return JSON.parse(localStorage.getItem('nextId')) || 1000;
}

function guardarDatos(){
    localStorage.setItem('anuncios', Json.stringify(listaAutomoviles));
    localStorage.setItem('nextId', Json.stringify(listaAutomoviles));
}