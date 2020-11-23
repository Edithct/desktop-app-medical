class Movimiento {
    table='movimientos';
    constructor(cantidad,descuento,monto_total,usuario_id,servicio_id,paciente_id,repository){
        this.cantidad=cantidad;
        this.descuento=descuento;
        this.monto_total=monto_total;
        this.usuario_id=usuario_id;
        this.servicio_id=servicio_id;
        this.paciente_id=paciente_id;
        this.repository=repository;
    }

    async save(){
        let result=await this.repository.createElement(this.table,this.getElement());
        return result;
    }

    getElement(){
        return {
            cantidad:Number(this.cantidad),
            descuento:Number(this.descuento),
            monto_total:Number(this.monto_total),
            usuario_id:Number(this.usuario_id),
            servicio_id:Number(this.servicio_id),
            paciente_id:Number(this.paciente_id)
        } 
    }
}

module.exports=Movimiento;