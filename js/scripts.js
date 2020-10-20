import crearTabla from "./tabla.js";
import Anuncio_Auto from "./anuncio_auto.js";

const listaAutomoviles = [];
let proximoId;
let divTabla = document.getElementById('divTabla');
window.addEventListener('load', inicializarManejadores);

function inicializarManejadores(){

    listaAutomoviles = obtenerAutomoviles();
    proximoId = obtenerId();
    console.log(listaAutomoviles);
    const frmAutomovil = document.forms[0].addEventListener('submit', e =>{
        e.preventDefault();
        const nuevoAuto = obtenerAutomovil();
        if(nuevoAuto){
            listaAutomoviles.push(nuevoAuto);
            proximoId++; 
            guardarDatos();
        }
    });


}

function obtenerAutomoviles(){

    return JSON.parse(localStorage.getItem('gente')) || [];
    
}
function obtenerAutomovil(){
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
    return nuevoAnuncioAuto;
}


function obtenerId(){
    return JSON.parse(localStorage.getItem('nextId')) || 1000;
}

function guardarDatos(){
    localStorage.setItem('anuncios', Json.stringify(listaAutomoviles));
    localStorage.setItem('nextId', proximoId);
}
function actualizarLista(){
    divTabla.innerHTML = "";
  divTabla.appendChild(crearTabla(listaAutomoviles));

}