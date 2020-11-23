class Paciente {
    table='pacientes';
    constructor(dni,nombres,nacimiento,sexo,direccion,telefono,ocupacion_empresa,repository){
        this.dni=dni;
        this.nombres=nombres;
        this.nacimiento=nacimiento;
        this.sexo=sexo;
        this.direccion=direccion;
        this.telefono=telefono;
        this.ocupacion_empresa=ocupacion_empresa;
        this.repository=repository;
    }

    async save(){
        let result=await this.repository.createElement(this.table,this.getElement());
        return result;
    }

    getElement(){
        return {
            dni:this.dni,
            nombres:this.nombres,
            nacimiento:this.nacimiento,
            sexo:this.sexo,
            direccion:this.direccion,
            telefono:this.telefono,
            ocupacion_empresa:this.ocupacion_empresa
        } 
    }
}

module.exports=Paciente; 