class Rol {
    table='roles';
    constructor(nombre,detalle,repository){
        this.nombre=nombre;
        this.detalle=detalle;
        this.repository=repository;
    }

    async save(){
        let result=await this.repository.createElement(this.table,this.getElement());
        return result;
    }

    getElement(){
        return {
            nombre:this.nombre,
            detalle:this.detalle
        } 
    }
}

module.exports=Rol;