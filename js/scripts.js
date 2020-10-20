import crearTabla from "./tabla.js";
import Anuncio from "./anuncio.js";

const listaAutomoviles = [];

window.addEventListener('load', inicializarManejadores);

function inicializarManejadores(){

    listaAutomoviles = obtenerAutomoviles();
    console.log(listaAutomoviles);
    const frmAutomovil = document.forms[0].addEventListener('submit', e =>{

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