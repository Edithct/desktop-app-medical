class Movimiento {
    table='movimientos';
    constructor(cantidad,fecha,descuento,detalle,monto_total,usuario_id,servicio_id,paciente_id,repository){
        this.cantidad=cantidad;
        this.fecha=fecha;
        this.descuento=descuento;
        this.detalle=detalle;
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
            cantidad:this.cantidad,
            fecha:this.fecha,
            descuento:this.descuento,
            detalle:this.detalle,
            monto_total:this.monto_total,
            usuario:this.usuario_id,
            servicio:this.servicio_id,
            paciente_id:this.paciente_id
        } 
    }
}

module.exports=Movimiento;