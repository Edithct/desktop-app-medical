class Usuario {
    table='usuarios';
    constructor(nombre,nacimiento,sexo,profesion,direccion,contraseña,username,dni,telefono,rol_id,repository){
        this.nombre=nombre;
        this.nacimiento=nacimiento;
        this.profesion=profesion;
        this.sexo=sexo;
        this.direccion=direccion;
        this.contraseña=contraseña;
        this.username=username;
        this.dni=dni;
        this.telefono=telefono;
        this.rol_id=rol_id;
        this.repository=repository;
    }

    async save(){
        
        let result=await this.repository.createElement(this.table,this.getElement());
        return result;
    }

    getElement(){
        return {
            nombre:this.nombre,
            nacimiento:this.nacimiento,
            profesion:this.profesion,
            sexo:this.sexo,
            direccion:this.direccion,
            contraseña:this.contraseña,
            username:this.username,
            dni:this.dni,
            telefono:this.telefono,
            rol_id:Number(this.rol_id)
        } 
    }
}

module.exports=Usuario;