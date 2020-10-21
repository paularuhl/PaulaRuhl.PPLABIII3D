

export default function crearTabla(lista){
    const tabla = document.createElement('table');

    tabla.appendChild(crearCabecera(lista[0]));
    tabla.appendChild(crearCuerpo(lista));

    return tabla;
}


function crearCabecera(item) {
    const cabecera = document.createElement('thead');
    const tr = document.createElement('tr');

    for (const key in item) {
        const th = document.createElement('th');
        const texto = document.createTextNode(key)
        th.appendChild(texto);
        tr.appendChild(th);
    }
    cabecera.appendChild(tr);
    return cabecera;
}

function crearCuerpo(lista) {
    const tbody = document.createElement('tbody');

    lista.forEach(element => {
        const tr = document.createElement('tr');

        for (const key in element) {
            const td = document.createElement('td');
            const texto = document.createTextNode(element[key])
            td.appendChild(texto);
            tr.appendChild(td);
        }
        if(element.hasOwnProperty('id')){
            tr.setAttribute('data-id', element['id'])

        }
        agregarManejadorTR(tr); 
        tbody.appendChild(tr);
    });

    return tbody;
}


function agregarManejadorTR(tr) {
    if (tr) {
        tr.addEventListener('click', function (e) {
            
            let automoviles = JSON.parse(localStorage.getItem('gente'));
            console.log(automoviles);
            let selected;
            automoviles.forEach(element => {
                if(tr.getAttribute('data-id') == element.id){
                    selected = element;
                }
            });
            document.getElementById('txtTitulo').value = element.titulo;
            frmAutomovil.transaction.value = element.transaccion;
            document.getElementById('txtDescripcion').value = element.descripcion;
            document.getElementById('txtPrecio').value = element.precio;
            document.getElementById('txtPuertas').value = element.num_puertas;
            document.getElementById('txtKMs').value = element.num_KMs;
            document.getElementById('txtPotencia').value = element.potencia;
            });
    }

}
