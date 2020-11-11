class Servicio {
    table='servicios';
    constructor(nombre,costo,detalle,es_servicio,es_ingreso,categoria_id,repository){
        this.nombre=nombre;
        this.costo=costo;
        this.detalle=detalle;
        this.es_servicio=es_servicio;
        this.es_ingreso=es_ingreso;
        this.categoria_id=categoria_id;
        this.repository=repository;
    }

    async save(){
        let result=await this.repository.createElement(this.table,this.getElement());
        return result;
    }

    getElement(){
        return {
            nombre:this.nombre,
            costo:this.costo,
            detalle:this.detalle,
            es_servicio:this.es_servicio,
            es_ingreso:this.es_ingreso,
            categoria_id:this.categoria_id
        } 
    }
}

module.exports=Servicio;