export default class Anuncio_Auto extends Auto {
    constructor(id, titulo, transaccion, descripcion, precio, num_puertas, num_KMs, potencia){
        super(id, titulo, transaccion, descripcion, precio);
        this.num_KMs = num_KMs;
        this.num_puertas = num_puertas;
        this.potencia = potencia;

    }
}

